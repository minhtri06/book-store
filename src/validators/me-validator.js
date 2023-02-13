const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const updateMyProfile = {
    [BODY]: Joi.object({
        name: commonElements.user.name,
        password: commonElements.user.password,
    }),
}

const likeBook = {
    [PARAMS]: Joi.object({ bookId: commonElements.book.id.required() }),
}

const unlikeBook = {
    [PARAMS]: Joi.object({ bookId: commonElements.book.id.required() }),
}

const meValidator = {
    updateMyProfile,
    likeBook,
    unlikeBook,
}

module.exports = meValidator
