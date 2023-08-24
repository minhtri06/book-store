const createError = require("http-errors")

const envConfig = require("../configs/envConfig")
const { queryParser } = require("../utils")
const { Invoice, InvoiceItem, Book } = require("../models")

/**
 *
 * @param {object} invoice
 * @param {[]} invoiceItems
 */
const createInvoice = async (invoice, invoiceItems) => {
    await checkInvoiceItems(invoiceItems)

    const newInvoice = await Invoice.create(invoice)
    try {
        for (let item of invoiceItems) {
            item.invoiceId = newInvoice.id
            await InvoiceItem.create(item)
        }
    } catch (error) {
        await newInvoice.destroy()
        throw error
    }

    await newInvoice.reload({ include: [Book] })
    return newInvoice
}

/**
 * Check invoice's items
 * @param {[]} invoiceItems
 */
const checkInvoiceItems = async (invoiceItems) => {
    if (invoiceItems.length === 0) {
        throw createError.BadRequest("Invoice has no item")
    }
    const bookIds = []
    for (let { bookId, quantity } of invoiceItems) {
        if (bookIds.includes(bookId)) {
            throw createError.BadRequest(
                `Invoice contains more than 1 item with book id ${bookId}`,
            )
        }
        bookIds.push(bookId)
        const book = await Book.findByPk(bookId)
        if (!book) {
            throw createError.NotFound("Book not found")
        }
        if (quantity > book.count) {
            throw createError.BadRequest("Item quantity exceeds the number of book")
        }
    }
}

const getInvoiceById = async (invoiceId, queryOptions = {}) => {
    return await Invoice.findByPk(invoiceId, queryOptions)
}

const getInvoiceByIdIncludeBooks = async (invoiceId) => {
    return await getInvoiceById(invoiceId, { include: [{ model: Book }] })
}

const queryInvoices = async ({
    userId,
    orderBy,
    bookId,
    getAll,
    limit,
    page,
    includeBooks,
}) => {
    const queryOptions = { where: {} }
    if (userId) {
        queryOptions.where.userId = userId
    }
    if (orderBy) {
        queryOptions.order = queryParser.orderBy(orderBy, ["updatedAt", "totalPayment"])
    }
    if (!getAll) {
        queryOptions.limit = limit || envConfig.DEFAULT_PAGE_LIMIT
        page = page || 1
        queryOptions.offset = (page - 1) * queryOptions.limit
    }
    if (includeBooks) {
        queryOptions.include = [{ model: Book, where: bookId ? { id: bookId } : {} }]
    }

    return await Invoice.findAll(queryOptions)
}

module.exports = {
    createInvoice,
    getInvoiceById,
    getInvoiceByIdIncludeBooks,
    queryInvoices,
}
