const router = require("express").Router()
const { userController } = require("../controllers")
const validate = require("../middlewares/validate")
const { userValidator } = require("../validators")
const auth = require("../middlewares/auth")
const { GET_USERS, MANAGE_USERS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(auth(GET_USERS), validate(userValidator.getUsers), userController.getUsers)
    .post(
        auth(MANAGE_USERS),
        validate(userValidator.createUser),
        userController.createUser
    )
router
    .route("/:userId")
    .get(auth(GET_USERS), validate(userValidator.getUserById), userController.getUserById)
    .patch(
        auth(MANAGE_USERS),
        validate(userValidator.updateUserById),
        userController.updateUserById
    )
    .delete(
        auth(MANAGE_USERS),
        validate(userValidator.deleteUserById),
        userController.deleteUserById
    )

module.exports = router
