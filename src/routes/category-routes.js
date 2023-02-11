const router = require("express").Router()

const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { categoryValidator } = require("../validators")
const { categoryController } = require("../controllers")
const { GET_USERS, MANAGE_USERS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(validate(categoryValidator.getCategories), categoryController.getCategories)

module.exports = router
