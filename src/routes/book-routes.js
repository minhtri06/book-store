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
router.post("/test", (req, res) => {
    console.log(req.body)
})

module.exports = router
