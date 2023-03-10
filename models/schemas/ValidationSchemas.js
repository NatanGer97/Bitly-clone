const Joi = require('joi');

module.exports.NewUserSchema = Joi.object({
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).required(),
    
});

module.exports.NewShortUrlReqSchema = Joi.object({
    longUrl: Joi.string().required(),
    username: Joi.string().min(2).required(),

});