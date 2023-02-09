const router = require("express").Router()
const passport = require("passport")
const validate = require("../middlewares/validate")
const { authValidator } = require("../validators")
const { authController } = require("../controllers")

router.post("/register", validate(authValidator.register), authController.registerUser)
router.post("/login", validate(authValidator.login), authController.login)
router.post("/logout", validate(authValidator.logout), authController.logout)
router.post(
    "/login-by-google",
    passport.authenticate("google-plus-token", { session: false }),
    authController.loginByGoogle
)
router.post(
    "/refresh-token",
    validate(authValidator.refreshToken),
    authController.refreshToken
)

module.exports = router
