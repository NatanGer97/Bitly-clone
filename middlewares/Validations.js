const { NewUserSchema } = require("../models/schemas/ValidationSchemas");

module.exports.validateNewUserInput = (req, res, next) => {
  const { error } = NewUserSchema.validate(req.body);

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    return res.status(400).json({ error: msg });
  }
  return next();
};
