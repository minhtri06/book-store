const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const register = {
    [BODY]: Joi.object({
        email: commonElements.user.email.required(),
        password: commonElements.user.password.required(),
        name: commonElements.user.name.required(),
        avatar: commonElements.user.avatar,
    }),
}

const login = {
    [BODY]: Joi.object({
        email: commonElements.user.email.required(),
        password: commonElements.user.password.required(),
    }),
}

const logout = {
    [BODY]: Joi.object({
        refreshToken: Joi.string().required(),
    }),
}

const refreshToken = {
    [BODY]: Joi.object({
        accessToken: Joi.string().required(),
        refreshToken: Joi.string().required(),
    }),
}

module.exports = {
    register,
    login,
    logout,
    refreshToken,
}
