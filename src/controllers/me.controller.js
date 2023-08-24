const { StatusCodes } = require("http-status-codes")
const createError = require("http-errors")

const { userService, invoiceService } = require("../services")

/** @type {import('express').RequestHandler} */
const createMyInvoice = async (req, res) => {
    const { invoice, invoiceItems } = req.body
    invoice.userId = req.user.id
    const newInvoice = await invoiceService.createInvoice(invoice, invoiceItems)
    return res.status(StatusCodes.CREATED).json({ newInvoice })
}

/** @type {import('express').RequestHandler} */
const getMyInvoiceById = async (req, res) => {
    const invoice = await invoiceService.getInvoiceByIdIncludeBooks(req.params.invoiceId)
    if (!invoice || invoice.userId !== req.user.id) {
        throw createError.NotFound("Invoice not found")
    }
    return res.status(StatusCodes.OK).json({ invoice })
}

/** @type {import('express').RequestHandler} */
const getMyInvoices = async (req, res) => {
    req.query.userId = req.user.id
    const invoices = await invoiceService.queryInvoices(req.query)
    return res.status(StatusCodes.OK).json({ invoices })
}

/** @type {import('express').RequestHandler} */
const getMyProfile = async (req, res) => {
    const user = await userService.getUserById(req.user.id)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    return res.json({ user })
}

/** @type {import('express').RequestHandler} */
const replaceMyAvatar = async (req, res) => {
    const newAvatar = await userService.replaceAvatar(req.user.id, req.file)
    return res.json({ newAvatar })
}

/** @type {import('express').RequestHandler} */
const updateMyProfile = async (req, res) => {
    await userService.updateUserById(req.user.id, req.body)
    return res.status(StatusCodes.NO_CONTENT).send()
}

const meController = {
    getMyInvoiceById,
    getMyInvoices,
    getMyProfile,
    updateMyProfile,
    replaceMyAvatar,
    createMyInvoice,
}

module.exports = meController
