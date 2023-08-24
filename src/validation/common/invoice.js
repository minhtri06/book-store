const Joi = require("joi")
const user = require("./user")

module.exports = {
    id: Joi.number().integer(),
    userId: user.id,
    phoneNumber: Joi.string(),
    address: Joi.string(),
    totalPayment: Joi.number().integer().min(0),
}
