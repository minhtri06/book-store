const Joi = require("joi")
const { user } = require("./common")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request

const registerUser = {
    [BODY]: Joi.object({
        name: user.name.required(),
        username: user.username.required(),
        password: user.password.required(),
    }),
}

const login = {
    [BODY]: Joi.object({
        username: user.username.required(),
        password: user.password.required(),
    }),
}

const logout = {
    [BODY]: Joi.object({
        refreshToken: Joi.string().required(),
    }),
}

const refreshAuthTokens = {
    [BODY]: Joi.object({
        accessToken: Joi.string().required(),
        refreshToken: Joi.string().required(),
    }),
}

module.exports = {
    registerUser,
    login,
    logout,
    refreshAuthTokens,
}
