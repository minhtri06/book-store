const jwt = require("jsonwebtoken")
const moment = require("moment")
const createError = require("http-errors")
const { RefreshToken } = require("../models")
const { REFRESH, ACCESS } = require("../utils").commonConstants
const { SECRET_KEY, REFRESH_EXPIRATION_DAYS, ACCESS_EXPIRATION_MINUTES } =
    require("../config/env-config").jwt

/**
 * generate access token
 * @param {number} userId
 * @returns {Promise<string>}
 */
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
 * Create access token
 * @param {number} userId
 * @returns {Promise<string>}
 */
const createAccessToken = (userId) => {
    const expires = moment().add(ACCESS_EXPIRATION_MINUTES, "minutes")
    return `Bearer ${generateToken(userId, expires, ACCESS)}`
}

/**
 * create refresh token
 * @param {number} userId
 * @returns {Promise<InstanceType<RefreshToken>>}
 */
const createRefreshToken = async (userId) => {
    const expires = moment().add(REFRESH_EXPIRATION_DAYS, "days")
    const token = generateToken(userId, expires, REFRESH)
    return RefreshToken.create({ token, userId, expires: expires.toDate() })
}

/**
 * Create auth tokens (access token and refresh token)
 * @param {number} userId
 * @returns {object}
 */
const createAuthTokens = async (userId) => {
    const accessToken = createAccessToken(userId)
    const refreshTokenIns = await createRefreshToken(userId)
    return { accessToken, refreshToken: refreshTokenIns.token }
}

/**
 * Get refresh token Instance by token
 * @param {string} token
 * @returns {Promise<InstanceType<RefreshToken>>}
 */
const getRefreshTokenByToken = async (token) => {
    return RefreshToken.findOne({ where: { token } })
}

/**
 * Decode token
 * @param {string} token
 * @returns {object|null}
 */
const decodeToken = (token) => {
    return jwt.decode(token, SECRET_KEY)
}

/**
 * Delete all refresh tokens of a user
 * @param {number} userId
 * @returns {Promise}
 */
const deleteAllRefreshTokensOfAUser = async (userId) => {
    RefreshToken.destroy({ where: { userId } })
}

/**
 * is payload exp expired
 * @param {number} exp
 * @returns {boolean}
 */
const isPayloadExpExpired = (exp) => {
    return exp < moment().unix()
}

const tokenService = {
    createAccessToken,
    createRefreshToken,
    createAuthTokens,
    getRefreshTokenByToken,
    decodeToken,
    deleteAllRefreshTokensOfAUser,
    isPayloadExpExpired,
}

module.exports = tokenService
