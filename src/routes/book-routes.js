const router = require("express").Router()

const validate = require("../middlewares/validate")
const { bookValidators } = require("../validators")
const { bookController } = require("../controllers")
const auth = require("../middlewares/auth")
const { MANAGE_BOOKS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(validate(bookValidators.getBooks), bookController.getBooks)
    .post(
        auth(MANAGE_BOOKS),
        validate(bookValidators.createBook),
        bookController.createBook
    )
router.post("/test-upload-image", (req, res) => {
    console.log(req.file)
    return res.send("Ok")
})

module.exports = router
