const Joi = require('Joi');

const authShema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required()
});

module.exports = authShema;
