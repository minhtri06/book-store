const Joi = require("joi")
const { roles } = require("../../configs/roles")

module.exports = {
    id: Joi.number().integer(),
    name: Joi.string(),
    password: Joi.string().min(6).max(30).alphanum(),
    username: Joi.string().alphanum(),
    avatar: Joi.string(),
    role: Joi.string().valid(...roles),
}
