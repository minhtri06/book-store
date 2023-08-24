const router = require("express").Router()

const { MANAGE_BOOKS } = require("../configs/roles").rights
const { categoryController: controller } = require("../controllers")
const { categoryValidation: validation } = require("../validation")
const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")

router
    .route("/")
    .get(validate(validation.getAllCategories), controller.getAllCategories)
    .post(validate(validation.createCategory), controller.createCategory)
router
    .route("/:categoryId")
    .get(validate(validation.getCategoryById), controller.getCategoryById)
    .patch(validate(validation.updateCategoryById), controller.updateCategoryById)
    .delete(validate(validation.deleteCategoryById), controller.deleteCategoryById)

module.exports = router
