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

    user.tinyCodes.push({
      code: generatedCode,
      longUrl: longUrl,
      clicks: parseInt(0),
    });
    await user.save();
    const shortenedUrl = `http://localhost:3000/${generatedCode}`;

    return res.status(201).json({ shortenedUrl: shortenedUrl });
  } catch (err) {
    console.log(err);
    console.log(err.stack);
    next(err);
  }
};

const getUrls = async (req, res, next) => {
  const { username } = req.query;
  
  console.log(username);
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const user = await UserService.getUserByEmail(username);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const urls = await UrlService.getUserUrls(username);
    return res.status(200).json({ urls: urls });
  } catch (err) {
    console.log(err);

    next(err);
  }
};

const getUserUrl = async (req, res, next) => {
  const { code } = req.params;
  console.log(code);
  if (!code) return res.status(400).json({ error: "Code is required" });

  try {
    const url = await UrlService.getUserUrl(code, req.user.email);
    if (!url) {
      return res.status(404).json({ error: "Url not found" });
    }
    return res.status(200).json({ url: url });
  } catch (err) {
    console.log(err);

    next(err);
  }
}

module.exports = { createShortUrl, getUrls, getUserUrl };
