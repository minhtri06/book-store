const jwt = require("jsonwebtoken")
const createError = require("http-errors")
const userService = require("./user-services")
const tokenService = require("./token-service")
const envConfig = require("../config/env-config")
const { RefreshToken } = require("../models")
const { ACCESS, REFRESH } = require("../utils").commonConstants

/**
 * Register
 * @param {object} userBody
 * @returns {Promise}
 */
const register = async (userBody) => {
    userBody.role = "user"
    const user = await userService.createUser(userBody)
    const authTokens = await tokenService.createAuthTokens(user.id)
    return { user, authTokens }
}

/**
 * Login (return user and auth tokens)
 * @param {string} email
 * @param {string} password
 * @returns {Promise<object>}
 */
const login = async (email, password) => {
    const user = await userService.getUserByEmailAndPassword(email, password)
    if (!user) {
        throw createError.BadRequest("Wrong email or password")
    }
    const authTokens = await tokenService.createAuthTokens(user.id)
    return { user, authTokens }
}

/**
 * Login by google authentication
 * @param {number} userId
 * @returns {Promise<object>}
 */
const loginByGoogle = async (userId) => {
    return tokenService.createAuthTokens(userId)
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
    const rTokenIns = await tokenService.getRefreshTokenByToken(refreshToken)
    if (!rTokenIns) {
        throw createError.NotFound("Token not found")
    }
    await rTokenIns.update({ isRevoked: true })
}

/**
 * Refresh auth tokens
 * @param {string} accessToken
 * @param {string} refreshToken
 * @returns {Promise<object>}
 */
const refreshAuthTokens = async (accessToken, refreshToken) => {
    accessToken = accessToken.slice(7)
    const aPayload = tokenService.decodeToken(accessToken)
    if (
        !aPayload ||
        aPayload.type !== ACCESS ||
        !tokenService.isPayloadExpExpired(aPayload.exp) // Access token must be expired
    ) {
        throw createError.BadRequest("Invalid token")
    }

    const rPayload = tokenService.decodeToken(refreshToken)
    if (
        !rPayload ||
        rPayload.type !== REFRESH ||
        tokenService.isPayloadExpExpired(rPayload.exp) // Refresh token must not be expired
    ) {
        throw createError.BadRequest("Invalid token")
    }

    const refreshTokenIns = await RefreshToken.findOne({
        where: { token: refreshToken, userId: rPayload.sub },
    })
    if (!refreshTokenIns) {
        throw createError.NotFound("Token not found")
    }
    if (refreshTokenIns.isBlacklisted) {
        throw createError.Unauthorized("Unauthorized")
    }
    if (refreshTokenIns.isUsed || refreshTokenIns.isRevoked) {
        refreshTokenIns.update({ isBlacklisted: true })
        await RefreshToken.update(
            { isBlacklisted: true },
            { where: { userId: rPayload.sub, isUsed: false, isRevoked: false } }
        )
        throw createError.Unauthorized("Unauthorized")
    }
    await refreshTokenIns.update({ isUsed: true })
    return tokenService.createAuthTokens(rPayload.sub)
}

module.exports = {
    register,
    login,
    loginByGoogle,
    logout,
    refreshAuthTokens,
}
