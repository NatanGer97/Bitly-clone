const { validateNewShortUrlInput } = require("../middlewares/Validations");
const UrlsController = require("../controllers/Urls.Controller");
const { validate } = require("../models/User");
const validateUser = require("../middlewares/auth/validateUser");

const router = require("express").Router();

router.get("/userUrls", validateUser, UrlsController.getUrls);

router.post(
  "/shorten",
  validateNewShortUrlInput,
  UrlsController.createShortUrl
);

router.get("/:code",validateUser, UrlsController.getUserUrl);

module.exports = router;
