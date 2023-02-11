const router = require("express").Router()

const validate = require("../middlewares/validate")
const fileUploader = require("../middlewares/file-uploader")
const { bookValidator } = require("../validators")
const { bookController } = require("../controllers")
const auth = require("../middlewares/auth")
const { MANAGE_BOOKS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(validate(bookValidator.getBooks), bookController.getBooks)
    .post(
        auth(MANAGE_BOOKS),
        fileUploader.single("image"),
        validate(bookValidator.createBook),
        bookController.createBook
    )
router
    .route("/:bookId")
    .get(validate(bookValidator.getBookById), bookController.getBookById)
    .patch(
        fileUploader.single("image"),
        validate(bookValidator.updateBookById),
        bookController.updateBookById
    )
    .delete(validate(bookValidator.deleteBookById), bookController.deleteBookById)

module.exports = router
