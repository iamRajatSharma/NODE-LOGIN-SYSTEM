const joi = require("joi");

const validation = joi.object({
    email: joi.string().email().trim(true).required(),
    password: joi.string().trim(true).required()
});