const router = require("express").Router()
const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { MANAGE_USERS } = require("../configs/roles").rights
const { meValidation: validation } = require("../validation")
const { meController: controller } = require("../controllers")
const { uploadImage } = require("../middlewares/upload")

router.use(auth())
router
    .route("/")
    .get(controller.getMyProfile)
    .patch(validate(validation.updateMyProfile), controller.updateMyProfile)
router.put("/avatar", uploadImage("avatar"), controller.replaceMyAvatar)
router
    .route("/invoices")
    .get(validate(validation.getMyInvoices), controller.getMyInvoices)
    .post(validate(validation.createMyInvoice), controller.createMyInvoice)
router.get(
    "/invoices/:invoiceId",
    validate(validation.getMyInvoiceById),
    controller.getMyInvoiceById,
)
module.exports = router
