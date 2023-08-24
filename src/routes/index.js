const router = require("express").Router()

router.use("/auth", require("./auth.routes"))
router.use("/authors", require("./author.routes"))
router.use("/books", require("./book.routes"))
router.use("/categories", require("./category.routes"))
router.use("/invoices", require("./invoice.routes"))
router.use("/me", require("./me.routes"))
router.use("/users", require("./user.routes"))

module.exports = router
