const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const GooglePlusTokenStrategy = require("passport-google-plus-token")
const { SECRET_KEY } = require("../config/env-config").jwt
const envConfig = require("../config/env-config")
const { ACCESS } = require("../utils").commonConstants
const createError = require("http-errors")
const { User } = require("../models")
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
                throw createError.Unauthorized("Invalid token")
            }
            const user = await User.findByPk(payload.sub)
            if (!user) {
                return done(null, false)
            }
            req.user = user
            return done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
)

const googlePlusTokenStrategy = new GooglePlusTokenStrategy(
    {
        clientID: envConfig.googleAuth.CLIENT_ID,
        clientSecret: envConfig.googleAuth.CLIENT_SECRET,
        passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
        try {
            let user = await userService.getUserByGoogleId(profile.id)
            if (!user) {
                user = await userService.createUser({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    googleId: profile.id,
                    role: "user",
                })
            }
            req.user = user
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    }
)

module.exports = { jwtStrategy, googlePlusTokenStrategy }
