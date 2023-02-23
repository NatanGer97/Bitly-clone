const { validateNewShortUrlInput } = require("../middlewares/Validations");
const UrlsController = require("../controllers/Urls.Controller");

const router = require("express").Router();

router.get("/userUrls", UrlsController.getUrls);

router.post("/shorten", validateNewShortUrlInput, UrlsController.createShortUrl);



module.exports = router;
