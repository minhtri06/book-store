const router = require("express").Router()
const { authController: controller } = require("../controllers")
const { authValidation: validation } = require("../validation")
const validate = require("../middlewares/validate")

router.post("/register", validate(validation.registerUser), controller.registerUser)
router.post("/login", validate(validation.login), controller.login)
router.post("/logout", validate(validation.logout), controller.logout)
router.post(
    "/refresh-auth-tokens",
    validate(validation.refreshAuthTokens),
    controller.refreshAuthTokens
)

module.exports = router
