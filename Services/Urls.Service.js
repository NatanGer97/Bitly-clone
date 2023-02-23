const Click = require("../models/Click");

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
    createdAt: new Date(),
  });

  return newClick;
};
module.exports = { generateCode, onUrlClick };
