const Joi = require("joi")

module.exports = {
    limit: Joi.number().integer().min(1).max(100),
    page: Joi.number().integer().min(1),
    orderBy: Joi.string().regex(/^[a-zA-Z0-9,-]{1,}$/),
}
