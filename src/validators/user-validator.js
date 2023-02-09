const Joi = require("joi")
const customValidation = require("./utils/custom-validation")
const commonElements = require("./utils/common-elements")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getUsers = {
    [QUERY]: Joi.object({
        name: Joi.string(),
        role: Joi.string(),
        sortBy: commonElements.query.sortBy(["name"]),
        limit: commonElements.query.limit,
        page: commonElements.query.page,
        attributes: commonElements.query.attributes,
    }),
}

const createUser = {
    [BODY]: Joi.object({
        name: Joi.string().required(),
        email: commonElements.user.email.required(),
        password: commonElements.user.password.required(),
        avatar: Joi.string(),
        role: commonElements.user.role.required(),
    }),
}

const getUserById = {
    [PARAMS]: Joi.object({
        userId: Joi.number().integer().required(),
    }),
}

const updateUserById = {
    [BODY]: Joi.object({
        name: Joi.string(),
        password: commonElements.user.password,
        avatar: Joi.string(),
    }),
    [PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required(),
    }),
}

const deleteUserById = {
    [PARAMS]: Joi.object({
        userId: Joi.number().integer().required(),
    }),
}

const userValidator = {
    getUserById,
    getUsers,
    createUser,
    updateUserById,
    deleteUserById,
}

module.exports = userValidator
