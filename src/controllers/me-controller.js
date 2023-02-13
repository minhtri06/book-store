const { meService, userService } = require("../services")

/** @type {import("express").RequestHandler} */
const getMyProfile = async (req, res) => {
    const user = await userService.getUserById(req.user.id)
    return res.json({ ...user.toJSON() })
}

const meController = { getMyProfile }

module.exports = meController
