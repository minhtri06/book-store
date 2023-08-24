const { StatusCodes } = require("http-status-codes")
const createError = require("http-errors")

const { userService } = require("../services")

/** @type {import('express').RequestHandler} */
const getUsers = async (req, res) => {
    const users = await userService.queryUsers(req.query)
    return res.json({ users })
}

/** @type {import('express').RequestHandler} */
const getUserById = async (req, res) => {
    const user = await userService.getUserById(req.params.userId)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    return res.json({ user })
}

/** @type {import('express').RequestHandler} */
const createUser = async (req, res) => {
    const user = await userService.createUser(req.body)
    return res.status(StatusCodes.CREATED).json({ user })
}

/** @type {import('express').RequestHandler} */
const updateUser = async (req, res) => {
    await userService.updateUserById(req.params.userId, req.body)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const deleteUser = async (req, res) => {
    await userService.deleteUserById(req.params.userId)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const replaceAvatar = async (req, res) => {
    const avatar = await userService.replaceAvatar(req.params.userId, req.file)
    return res.json({ avatar })
}

const userController = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    replaceAvatar,
}

module.exports = userController
