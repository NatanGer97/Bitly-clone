const express = require("express");
const router = express.Router();
const { redis } = require("../Services/Redis.Service");
const UserService = require("../services/User.Service");
const UrlService = require("../services/Urls.Service");
const UserModel = require("../models/User");

router.get("/:code", async (req, res, next) => {
  const { code } = req.params;
  try {
    const codeValue = await redis.get(code);
    if (!codeValue) {
      return res.status(404).json({ error: "Code not found" });
    }
    const { longUrl, username } = JSON.parse(codeValue);
    const user = await UserService.getUserByEmail(username);
    if (user) {
      
      res.redirect(longUrl);
    } else {
      console.log("User not found");
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
