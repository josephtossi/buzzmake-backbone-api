const Joi = require('Joi');

const authSignUpShema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
    name: Joi.string().required()
});


const authSignInShema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
});

module.exports.authSignUpShema = authSignUpShema;
module.exports.authSignInShema = authSignInShema;