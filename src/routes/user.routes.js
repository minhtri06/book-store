const router = require("express").Router()
const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { MANAGE_USERS } = require("../configs/roles").rights
const { userValidation: validation } = require("../validation")
const { userController: controller } = require("../controllers")
const { uploadImage } = require("../middlewares/upload")

router
    .route("/")
    .get(auth(MANAGE_USERS), validate(validation.getUsers), controller.getUsers)
    .post(auth(MANAGE_USERS), validate(validation.createUser), controller.createUser)
router
    .route("/:userId")
    .get(auth(MANAGE_USERS), validate(validation.getUserById), controller.getUserById)
    .patch(auth(MANAGE_USERS), validate(validation.updateUser), controller.updateUser)
    .delete(auth(MANAGE_USERS), validate(validation.deleteUser), controller.deleteUser)
router.put(
    "/:userId/avatar",
    auth(MANAGE_USERS),
    uploadImage("avatar"),
    validate(validation.replaceAvatar),
    controller.replaceAvatar,
)

module.exports = router
