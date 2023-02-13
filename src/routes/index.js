const router = require("express").Router()

router.use("/auth", require("./auth-routes"))
router.use("/users", require("./user-routes"))
router.use("/categories", require("./category-routes"))
router.use("/books", require("./book-routes"))
router.use("/me", require("./me-routes"))

module.exports = router
