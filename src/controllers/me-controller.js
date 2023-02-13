const { meService, userService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getMyProfile = async (req, res) => {
    const user = await userService.getUserById(req.user.id)
    return res.json({ ...user.toJSON() })
}

/** @type {import("express").RequestHandler} */
const updateMyProfile = async (req, res) => {
    const user = await userService.updateUserById(req.user.id, req.body, req.file)
    return res.json({ ...user.toJSON() })
}

/** @type {import("express").RequestHandler} */
const likeBook = async (req, res) => {
    await userService.likeBook(req.user.id, req.params.bookId)
    return res.status(StatusCodes.NO_CONTENT).json({})
}

const meController = {
    getMyProfile,
    updateMyProfile,
    likeBook,
}

module.exports = meController
