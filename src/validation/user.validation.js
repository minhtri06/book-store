const Joi = require("joi")
const { user, query } = require("./common")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request

const getUsers = {
    [QUERY]: Joi.object({
        limit: query.limit,
        page: query.limit,
        role: user.role,
    }),
}

const getUserById = {
    [PARAMS]: Joi.object({
        userId: user.id.required(),
    }),
}

const createUser = {
    [BODY]: Joi.object({
        name: user.name.required(),
        username: user.username.required(),
        password: user.password.required(),
        role: user.role.required(),
    }),
}

const updateUser = {
    [PARAMS]: Joi.object({
        userId: user.id.required(),
    }),
    [BODY]: Joi.object({
        name: user.name,
        username: user.username,
        password: user.password,
        role: user.role,
    }),
}

const replaceAvatar = {
    [PARAMS]: Joi.object({
        userId: user.id.required(),
    }),
    [FILE]: Joi.object().required(),
}

const deleteUser = {
    [PARAMS]: Joi.object({
        userId: user.id.required(),
    }),
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    replaceAvatar,
    deleteUser,
}
