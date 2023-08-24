const Joi = require("joi")
const { user, invoice, invoiceItem, query } = require("./common")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request

const createMyInvoice = {
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

const getMyInvoiceById = {
    [PARAMS]: Joi.object({ invoiceId: invoice.id.required() }),
}

const getMyInvoices = {
    [QUERY]: Joi.object({
        limit: query.limit,
        page: query.page,
        orderBy: query.orderBy,
        includeBooks: Joi.bool(),
    }),
}

const updateMyProfile = {
    [BODY]: Joi.object({ name: user.name }),
}

module.exports = {
    createMyInvoice,
    getMyInvoiceById,
    getMyInvoices,
    updateMyProfile,
}
