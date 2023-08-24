const createError = require("http-errors")
const { StatusCodes } = require("http-status-codes")

const { invoiceService } = require("../services")

/** @type {import('express').RequestHandler} */
const createInvoice = async (req, res) => {
    const newInvoice = await invoiceService.createInvoice(
        req.body.invoice,
        req.body.invoiceItems,
    )
    return res.status(StatusCodes.CREATED).json({ newInvoice })
}

/** @type {import('express').RequestHandler} */
const getInvoices = async (req, res) => {
    const invoices = await invoiceService.queryInvoices(req.query)
    return res.status(StatusCodes.OK).json({ invoices })
}

/** @type {import('express').RequestHandler} */
const getInvoiceById = async (req, res) => {
    const invoice = await invoiceService.getInvoiceByIdIncludeBooks(req.params.invoiceId)
    if (!invoice) {
        throw createError.NotFound("Invoice not found")
    }
    return res.status(StatusCodes.OK).json({ invoice })
}

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
}
