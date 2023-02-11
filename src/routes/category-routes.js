const router = require("express").Router()

const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { categoryValidator: validator } = require("../validators")
const { categoryController: controller } = require("../controllers")
const { GET_USERS, MANAGE_USERS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get(validate(validator.getCategories), controller.getCategories)
    .post(validate(validator.createCategory), controller.createCategory)
router
    .route("/:categoryId")
    .get(validate(validator.getCategoryById), controller.getCategoryById)
    .patch(validate(validator.updateCategory), controller.updateCategory)

module.exports = router
