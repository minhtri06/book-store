const jwt = require("jsonwebtoken")
const moment = require("moment")

const { ACCESS, REFRESH } = require("../configs/commonConstants").tokenTypes
const { SECRET_KEY, ACCESS_EXPIRATION_MINUTES, REFRESH_EXPIRATION_DAYS } =
    require("../configs/envConfig").jwt
const { RefreshToken } = require("../models")

const generateToken = (userId, expires, type) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    }
    return jwt.sign(payload, SECRET_KEY)
}

/**
 * Generate access token
 * @param {number} userId
 * @returns {string}
 */
const generateAccessToken = (userId) => {
    const expires = moment().add(ACCESS_EXPIRATION_MINUTES, "minutes")
    return `Bearer ${generateToken(userId, expires, ACCESS)}`
}

/**
 * Create refresh token
 * @param {number} userId
 * @returns {Promise<InstanceType<RefreshToken>>}
 */
const createRefreshToken = async (userId) => {
    const expires = moment().add(REFRESH_EXPIRATION_DAYS, "days")
    const token = generateToken(userId, expires, REFRESH)
    return await RefreshToken.create({
        token: token,
        expires: expires.toDate(),
        userId,
    })
}

/**
 * Create auth tokens
 * @param {number} userId
 * @returns {Promise<object<accessToken, refreshToken>}
 */
const createAuthTokens = async (userId) => {
    const accessToken = generateAccessToken(userId)
    const refreshToken = await createRefreshToken(userId)
    return {
        accessToken,
        refreshToken: refreshToken.token,
    }
}

const getRefreshTokenByToken = async (token) => {
    return await RefreshToken.findOne({ where: { token } })
}

/**
 * Get payload from token
 * @param {string} token
 * @returns {object|null}
 */
const getPayload = (token) => {
    return jwt.decode(token, SECRET_KEY)
}

const getTokenInfo = (token) => {
    const info = getPayload(token)
    if (info) {
        info.isExpired = info.exp < moment().unix()
    }
    return info
}

/**
 * Check token is expired
 * @param {string} token
 * @returns {boolean}
 */
const isTokenExpired = (token) => {
    const payload = getPayload(token)
    return payload.exp < moment().unix()
}

const blacklistAllUsableRTokensOfAUser = async (userId) => {
    await RefreshToken.update(
        { isBlacklisted: true },
        { where: { userId, isUsed: false, hasRevoked: false } },
    )
}

module.exports = {
    createAuthTokens,
    getRefreshTokenByToken,
    getPayload,
    getTokenInfo,
    isTokenExpired,
    blacklistAllUsableRTokensOfAUser,
}
