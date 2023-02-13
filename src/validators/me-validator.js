const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const updateMyProfile = {
    [BODY]: Joi.object({
        name: commonElements.user.name,
    }),
}

const meValidator = {}

module.exports = meValidator
