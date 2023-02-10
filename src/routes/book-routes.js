const router = require("express").Router()

const validate = require("../middlewares/validate")
const fileUploader = require("../middlewares/file-uploader")
const { bookValidators } = require("../validators")
const { bookController } = require("../controllers")
const auth = require("../middlewares/auth")
const { MANAGE_BOOKS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(validate(bookValidators.getBooks), bookController.getBooks)
    .post(
        auth(MANAGE_BOOKS),
        fileUploader.single("image"),
        validate(bookValidators.createBook),
        bookController.createBook
    )
router
    .route("/:bookId")
    .get(validate(bookValidators.getBookById), bookController.getBookById)
    .patch(
        fileUploader.single("image"),
        validate(bookValidators.updateBookById),
        bookController.updateBookById
    )

module.exports = router
