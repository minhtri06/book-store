const router = require("express").Router()

router.use("/auth", require("./auth-routes"))
router.use("/users", require("./user-routes"))
router.use("/categories", require("./category-routes"))
router.use("/books", require("./book-routes"))

module.exports = router
