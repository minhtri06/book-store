const createError = require("http-errors")
const { Op } = require("sequelize")

const envConfig = require("../configs/envConfig")
const {
    queryParser,
    updateImage,
    file: { deleteStaticFile },
} = require("../utils")
const { Book, InvoiceItem } = require("../models")

const createBook = async (bookBody) => {
    bookBody.image = undefined
    return await Book.create(bookBody)
}

const deleteBook = async (bookId) => {
    const book = await getBookById(bookId)
    if (!book) {
        throw createError.NotFound("Book not found")
    }
    if (await doesBookHaveInvoices(bookId)) {
        throw createError.BadRequest("Book has invoices, cannot delete")
    }
    const bookImage = book.image
    await book.destroy()

    if (bookImage) {
        await deleteStaticFile(bookImage)
    }
}

const doesBookHaveInvoices = async (bookId) => {
    const invoiceItem = await InvoiceItem.findOne({ where: { bookId } })
    return invoiceItem !== null
}

const getBookById = async (bookId) => {
    return await Book.findByPk(bookId)
}

const isBookTitleAlreadyExist = async (title, { excludeId } = {}) => {
    const where = { title }
    if (excludeId) {
        where.id = { [Op.ne]: excludeId }
    }
    const book = await Book.findOne({ where })
    return book !== null
}

const queryBooks = async ({
    categoryId,
    authorId,
    orderBy,
    limit,
    page,
    getAll,
    attributes,
}) => {
    const queryOptions = {
        where: {},
        attributes: attributes || { exclude: ["createdAt", "updatedAt"] },
    }

    if (categoryId) {
        queryOptions.where.categoryId = categoryId
    }
    if (authorId) {
        queryOptions.where.authorId = authorId
    }
    if (orderBy) {
        queryOptions.order = queryParser.orderBy(orderBy, ["price"])
    }
    if (!getAll) {
        queryOptions.limit = limit || envConfig.DEFAULT_PAGE_LIMIT
        page = page || 1
        queryOptions.offset = (page - 1) * queryOptions.limit
    }

    return await Book.findAll(queryOptions)
}

const updateBookById = async (id, updateBody) => {
    const book = await getBookById(id)
    if (!book) {
        throw createError.NotFound("Book not found")
    }
    await book.update(updateBody)
}

const updateBooks = async ({ where, updateBody }) => {
    return await Book.update(updateBody, { where })
}

const updateBookImage = async (bookId, imageFile) => {
    return await updateImage(getBookById(bookId), "Book", "image", imageFile)
}

module.exports = {
    createBook,
    deleteBook,
    getBookById,
    isBookTitleAlreadyExist,
    queryBooks,
    updateBookById,
    updateBooks,
    updateBookImage,
}
