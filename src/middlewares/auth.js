const passport = require("passport")
const createError = require("http-errors")

const { roleRights } = require("../configs/roles")

/**
 *
 * @param {string[]} requiredRights
 * @param {object} req
 * @param {function} next
 * @returns {function}
 */
const verifyCallBack = (requiredRights, req, next) => async (err, user, info) => {
    try {
        if (err || !user || info) {
            throw createError.Unauthorized("Unauthorized")
        }
        const userRights = roleRights.get(user.role)
        if (!requiredRights.every((right) => userRights.includes(right))) {
            throw createError.Forbidden("Forbidden")
        }
        req.user.rights = userRights
        next()
    } catch (error) {
        next(error)
    }
}

const auth = (...requiredRights) => {
    return async (req, res, next) => {
        passport.authenticate(
            "jwt",
            { session: false },
            verifyCallBack(requiredRights, req, next),
        )(req, res, next)
    }
}

module.exports = auth
