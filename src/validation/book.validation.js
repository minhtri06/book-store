const Joi = require("joi")
const { query, book } = require("./common")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request

const createBook = {
    [BODY]: Joi.object({
        title: book.title.required(),
        authorId: book.authorId,
        categoryId: book.categoryId.required(),
        count: book.count.required(),
        price: book.price.required(),
    }),
}

const deleteBook = { [PARAMS]: Joi.object({ bookId: book.id.required() }) }

const getBooks = {
    [QUERY]: Joi.object({
        authorId: book.authorId,
        categoryId: book.categoryId,
        orderBy: query.orderBy,
        limit: query.limit,
        page: query.page,
    }),
}

const getBookById = {
    [PARAMS]: Joi.object({ bookId: book.id.required() }),
}

const updateBook = {
    [PARAMS]: Joi.object({ bookId: book.id.required() }),
    [BODY]: Joi.object({
        title: book.title,
        authorId: book.authorId,
        categoryId: book.categoryId,
        price: book.price,
        count: book.count,
    }),
}

const updateBookImage = { [PARAMS]: Joi.object({ bookId: book.id.required() }) }

module.exports = {
    createBook,
    deleteBook,
    getBooks,
    getBookById,
    updateBook,
    updateBookImage,
}
