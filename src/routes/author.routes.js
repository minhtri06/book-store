const router = require("express").Router()

const { MANAGE_BOOKS } = require("../configs/roles").rights
const { authorController: controller } = require("../controllers")
const { authorValidation: validation } = require("../validation")
const {
    validate,
    auth,
    upload: { uploadImage },
} = require("../middlewares")

router
    .route("/")
    .get(controller.getAllAuthors)
    .post(auth(MANAGE_BOOKS), validate(validation.createAuthor), controller.createAuthor)
router
    .route("/:authorId")
    .get(validate(validation.getAuthorById), controller.getAuthorById)
    .patch(validate(validation.updateAuthor), controller.updateAuthor)
    .delete(validate(validation.deleteAuthor), controller.deleteAuthor)
router.put(
    "/:authorId/image",
    auth(MANAGE_BOOKS),
    uploadImage("image"),
    validate(validation.updateAuthorImage),
    controller.updateAuthorImage,
)
router.get(
    "/:authorId/books",
    validate(validation.getAllBooksOfAuthor),
    controller.getAllBooksOfAuthor,
)

module.exports = router
