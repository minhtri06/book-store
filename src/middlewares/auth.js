const passport = require("passport")
const createError = require("http-errors")
const roleConfig = require("../config/roles")

/**
 *
 * @param {string[]} requiredRights
 */
const verifyCallback = (requiredRights, req, next) => async (err, user, info) => {
    try {
        if (err || !user || info) {
            throw createError.Unauthorized(info ? info.message : "Please authenticate")
        }
        if (requiredRights.length) {
            const userRights = roleConfig.roleRights.get(user.role)
            const hasRequiredRights = requiredRights.every((right) =>
                userRights.includes(right)
            )
            if (!hasRequiredRights && req.params.userId != user.id) {
                throw createError.Forbidden("Forbidden")
            }
        }
        next()
    } catch (error) {
        next(error)
    }
}

const auth =
    (...requiredRights) =>
    async (req, res, next) => {
        passport.authenticate(
            "jwt",
            { session: false },
            verifyCallback(requiredRights, req, next)
        )(req, res, next)
    }

module.exports = auth
