const Click = require("../models/Click");
const UserModel = require("../models/User");

const generateCode = () => {
  const codeSize = process.env.SHORT_URL_SIZE;
  let code = [];
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < codeSize; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code.push(chars.charAt(randomIndex));
  }

  return code.join("");
};
const onUrlClick = async (code, longUrl, username) => {
  const newClick = await Click.create({
    shortUrl: code,
    longUrl: longUrl,
    username: username,
    clickedAt: new Date(),
  });

  const user = await UserModel.findOne({ email: username }).exec();
  for (let i = 0; i < user.tinyCodes.length; i++) {
    if (user.tinyCodes[i].code === code) {
      user.tinyCodes[i].clicks++;
      console.log(user.tinyCodes[i]);
      break;
    }
  }
  await UserModel.updateOne({ email: username }, user).exec();
};

const getUserUrls = async (username) => {
  try {
    const user =  await UserModel.findOne({ email: username }).exec();
    return user.tinyCodes;
  } catch (err) {
    throw err;
  }
};

const getUserUrl = async (code, username) => {
    try {
        const urls = await getUserUrls(username);
        return urls.filter((url) => url.code === code)[0];
    }
    catch (err) {
        throw err;
    }

};
module.exports = { generateCode, onUrlClick, getUserUrls, getUserUrl };
