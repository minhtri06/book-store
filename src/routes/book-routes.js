const router = require("express").Router()

const validate = require("../middlewares/validate")
const { bookValidators } = require("../validators")
const { bookController } = require("../controllers")
const auth = require("../middlewares/auth")
const { GET_USERS, MANAGE_USERS } = require("../utils").commonConstants.rights

router.route("/").get(validate(bookValidators.getBooks), bookController.getBooks)

module.exports = router
