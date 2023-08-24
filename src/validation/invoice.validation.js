const Joi = require("joi")
const { query, invoice, invoiceItem } = require("./common")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request

const createInvoice = {
    [BODY]: Joi.object({
        invoice: Joi.object({
            phoneNumber: invoice.phoneNumber.required(),
            address: invoice.address.required(),
        }).required(),
        invoiceItems: Joi.array()
            .items(
                Joi.object({
                    bookId: invoiceItem.bookId.required(),
                    quantity: invoiceItem.quantity.required(),
                }),
            )
            .min(1)
            .required(),
    }),
}

const getInvoices = {
    [QUERY]: Joi.object({
        userId: invoice.userId,
        limit: query.limit,
        page: query.page,
        orderBy: query.orderBy,
        includeBooks: Joi.bool(),
    }),
}

const getInvoiceById = {
    [PARAMS]: Joi.object({ invoiceId: invoice.id.required() }),
}

module.exports = {
    createInvoice,
    getInvoices,
    getInvoiceById,
}
