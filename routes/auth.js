
const router = require("express").Router();
const AuthController = require("../controllers/Auth.Controller");

const { validateNewUserInput } = require("../middlewares/Validations");

router.post("/register", validateNewUserInput, AuthController.register);
router.post("/login", AuthController.login);

module.exports = router;