const router = require("express").Router()

const { userController: controller } = require("../controllers")
const { userValidator: validator } = require("../validators")
const validate = require("../middlewares/validate")
const fileUploader = require("../middlewares/file-uploader")
const auth = require("../middlewares/auth")
const { GET_USERS, MANAGE_USERS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(auth(GET_USERS), validate(validator.getUsers), controller.getUsers)
    .post(auth(MANAGE_USERS), validate(validator.createUser), controller.createUser)
router
    .route("/:userId")
    .get(auth(GET_USERS), validate(validator.getUserById), controller.getUserById)
    .patch(
        auth(MANAGE_USERS),
        fileUploader.single("avatar"),
        validate(validator.updateUserById),
        controller.updateUserById
    )
    .delete(
        auth(MANAGE_USERS),
        validate(validator.deleteUserById),
        controller.deleteUserById
    )

module.exports = router
