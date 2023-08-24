const router = require("express").Router()

const { MANAGE_BOOKS } = require("../configs/roles").rights
const { bookController: controller } = require("../controllers")
const { bookValidation: validation } = require("../validation")
const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { uploadImage } = require("../middlewares/upload")

router
    .route("/")
    .get(validate(validation.getBooks), controller.getBooks)
    .post(auth(MANAGE_BOOKS), validate(validation.createBook), controller.createBook)
router
    .route("/:bookId")
    .get(validate(validation.getBookById), controller.getBookById)
    .patch(auth(MANAGE_BOOKS), validate(validation.updateBook), controller.updateBook)
    .delete(auth(MANAGE_BOOKS), validate(validation.deleteBook), controller.deleteBook)
router.put(
    "/:bookId/image",
    auth(MANAGE_BOOKS),
    uploadImage("image"),
    validate(validation.updateBookImage),
    controller.updateBookImage,
)

module.exports = router
