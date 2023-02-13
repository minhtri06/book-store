const router = require("express").Router()

const passport = require("passport")
const validate = require("../middlewares/validate")
const fileUploader = require("../middlewares/file-uploader")
const { authValidator: validator } = require("../validators")
const { authController: controller } = require("../controllers")

router.post(
    "/register",
    fileUploader.single("avatar"),
    validate(validator.register),
    controller.registerUser
)
router.post("/login", validate(validator.login), controller.login)
router.post("/logout", validate(validator.logout), controller.logout)
router.post(
    "/login-by-google",
    passport.authenticate("google-plus-token", { session: false }),
    controller.loginByGoogle
)
router.post("/refresh-token", validate(validator.refreshToken), controller.refreshToken)

module.exports = router
