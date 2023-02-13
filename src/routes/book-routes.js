const router = require("express").Router()

const validate = require("../middlewares/validate")
const fileUploader = require("../middlewares/file-uploader")
const { bookValidator: validator } = require("../validators")
const { bookController: controller } = require("../controllers")
const auth = require("../middlewares/auth")
const { MANAGE_BOOKS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(validate(validator.getBooks), controller.getBooks)
    .post(
        auth(MANAGE_BOOKS),
        fileUploader.single("image"),
        validate(validator.createBook),
        controller.createBook
    )
router.get("/top-like")
router
    .route("/:bookId")
    .get(validate(validator.getBookById), controller.getBookById)
    .patch(
        fileUploader.single("image"),
        validate(validator.updateBookById),
        controller.updateBookById
    )
    .delete(validate(validator.deleteBookById), controller.deleteBookById)
router.get("/:bookId/category")

module.exports = router
