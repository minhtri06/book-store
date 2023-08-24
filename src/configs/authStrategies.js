const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const createError = require("http-errors")

const { SECRET_KEY } = require("./envConfig").jwt
const { ACCESS } = require("./commonConstants").tokenTypes
const { userService } = require("../services")

const jwtStrategy = new JwtStrategy(
    {
        secretOrKey: SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken("Authorization"),
        passReqToCallback: true,
    },
    async (req, payload, done) => {
        try {
            if (payload.type !== ACCESS) {
                throw createError.BadRequest("Invalid token")
            }
            const user = await userService.getUserById(payload.sub)
            if (!user) {
                throw createError.Unauthorized("Unauthorized")
            }
            req.user = user
            return done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
)

module.exports = {
    jwtStrategy,
}
