const Joi = require("joi")

module.exports = {
    id: Joi.number().integer(),
    name: Joi.string(),
}
