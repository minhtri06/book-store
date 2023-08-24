const { StatusCodes } = require("http-status-codes")

const { authService } = require("../services")

/** @type {import('express').RequestHandler} */
const registerUser = async (req, res) => {
    const response = await authService.registerUser(req.body)
    return res.status(StatusCodes.CREATED).json(response)
}

/** @type {import('express').RequestHandler} */
const login = async (req, res) => {
    const { username, password } = req.body
    const authTokens = await authService.login(username, password)
    return res.json({ authTokens })
}

/** @type {import('express').RequestHandler} */
const logout = async (req, res) => {
    await authService.logout(req.body.refreshToken)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const refreshAuthTokens = async (req, res) => {
    const newAuthTokens = await authService.refreshAuthTokens(
        req.body.accessToken,
        req.body.refreshToken
    )
    return res.json({ newAuthTokens })
}

const authController = {
    registerUser,
    login,
    logout,
    refreshAuthTokens,
}

module.exports = authController
