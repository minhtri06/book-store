const router = require("express").Router()

const { ADMIN, MANAGE_SALES } = require("../configs/roles").rights
const { invoiceController: controller } = require("../controllers")
const { invoiceValidation: validation } = require("../validation")
const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { uploadImage } = require("../middlewares/upload")

router
    .route("/")
    .get(auth(MANAGE_SALES), validate(validation.getInvoices), controller.getInvoices)
    .post(validate(validation.createInvoice), controller.createInvoice)
router
    .route("/:invoiceId")
    .get(validate(validation.getInvoiceById), controller.getInvoiceById)

module.exports = router
