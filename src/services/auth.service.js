const createError = require("http-errors")

const { ACCESS, REFRESH } = require("../configs/commonConstants").tokenTypes
const userService = require("./user.service")
const tokenService = require("./token.service")

const registerUser = async (userBody) => {
    userBody.role = "user"
    const user = await userService.createUser(userBody)
    const authTokens = await tokenService.createAuthTokens(user.id)
    return { user, authTokens }
}

const login = async (username, password) => {
    const user = await userService.getUserByUsername(username)
    if (!user || !user.comparePassword(password)) {
        throw createError.BadRequest("Wrong username or password")
    }
    const authTokens = await tokenService.createAuthTokens(user.id)
    return authTokens
}

const logout = async (rToken) => {
    const rTokenInst = await tokenService.getRefreshTokenByToken(rToken)
    if (!rTokenInst) {
        throw createError.NotFound("Token not found")
    }
    await rTokenInst.update({ hasRevoked: true })
}

/**
 * Refresh Auth tokens
 * @param {string} aToken
 * @param {string} rToken
 * @returns {Promise<object>}
 */
const refreshAuthTokens = async (aToken, rToken) => {
    aToken = aToken.slice(7)
    const aTokenInfo = tokenService.getTokenInfo(aToken)
    const rTokenInfo = tokenService.getTokenInfo(rToken)

    if (
        !aTokenInfo ||
        !rTokenInfo ||
        aTokenInfo.type !== ACCESS ||
        rTokenInfo.type !== REFRESH ||
        rTokenInfo.sub !== aTokenInfo.sub
    ) {
        throw createError.BadRequest("Invalid token")
    }
    if (!aTokenInfo.isExpired) {
        throw createError.BadRequest("Access token has not expired yet")
    }
    if (rTokenInfo.isExpired) {
        throw createError.BadRequest("Refresh token has expired")
    }

    const rTokenInst = await tokenService.getRefreshTokenByToken(rToken)
    if (!rTokenInst) {
        throw createError.BadRequest("Token not found")
    }

    if (rTokenInst.isBlacklisted) {
        throw createError.Unauthorized("Unauthorized")
    }

    const userId = rTokenInfo.sub
    if (rTokenInst.isUsed || rTokenInst.hasRevoked) {
        // Blacklist this token and all usable refresh tokens of that user
        await rTokenInst.update({ isBlacklisted: true })
        await tokenService.blacklistAllUsableRTokensOfAUser(userId)
        throw createError.Unauthorized("Unauthorized")
    }

    await rTokenInst.update({ isUsed: true })
    return tokenService.createAuthTokens(userId)
}

const authService = {
    registerUser,
    login,
    logout,
    refreshAuthTokens,
}

module.exports = authService
