const Joi = require("joi")
const invoice = require("./invoice")
const book = require("./book")

module.exports = {
    invoiceId: invoice.id,
    bookId: book.id,
    price: book.price,
    quantity: Joi.number().integer().min(1),
    totalPrice: Joi.number().integer().min(0),
}
