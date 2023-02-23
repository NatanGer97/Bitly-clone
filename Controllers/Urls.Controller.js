const UserService = require("../services/User.Service");
const UrlService = require("../services/Urls.Service");
const { redis } = require("../Services/Redis.Service");


const createShortUrl = async (req, res, next) => {
    const { longUrl, username } = req.body;
    try {
        const user = await UserService.getUserByEmail(username);
        if (!user) {
          return res.status(404).json({ error: "User not found" });
        }
    
        let generatedCode = UrlService.generateCode();
        console.log(generatedCode);
    
        const payloadValue = JSON.stringify({
          longUrl: longUrl,
          username: username,
        });
        
        let isSet = await redis.setNX(generatedCode, payloadValue);
        const attemptsCounter = 0;
        while (!isSet && attemptsCounter < 4) {
          generatedCode = UrlService.generateCode();
          isSet = await redis.setNX(code, { longUrl: longUrl, username: username });
          attemptsCounter++;
        }
    
        if (attemptsCounter === 4) {
          return res
            .status(500)
            .json({ error: "Could not generate code, all option are taken" });
        }
    
        user.tinyCodes.push({ code: generatedCode, longUrl: longUrl});
        await user.save();
        const shortenedUrl = `http://localhost:3000/${generatedCode}`;
    
        return res.status(201).json({ shortenedUrl: shortenedUrl });
      } catch (err) {
        console.log(err);
        console.log(err.stack);
        next(err);
      }


};

const onUrlClick = async (req, res, next) => {};

module.exports = { createShortUrl, onUrlClick };