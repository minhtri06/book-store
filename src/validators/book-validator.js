const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { Category } = require("../models")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getBooks = {
    [QUERY]: Joi.object({
        title: Joi.string(),
        categoryId: Joi.number().integer(),
        sortBy: commonElements.query.sortBy(["price", "available", "createdAt"]),
        include: commonElements.query.include({
            category: { model: Category, attributes: ["id", "name"] },
        }),
        limit: commonElements.query.limit,
        page: commonElements.query.page,
        numericFilters: commonElements.query.numericFilters(["price", "available"]),
    }),
}

const createBook = {
    [BODY]: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        available: Joi.number().integer().min(0).required(),
        description: Joi.string(),
        categoryId: Joi.number().integer().required(),
    }),
}

const getBookById = {
    [PARAMS]: Joi.object({
        bookId: Joi.number().integer().required(),
    }),
    [QUERY]: Joi.object({
        include: commonElements.query.include({
            category: { model: Category, attributes: ["id", "name"] },
        }),
    }),
}

const updateBookById = {
    [PARAMS]: Joi.object({
        bookId: commonElements.book.id.required(),
    }),
    [BODY]: Joi.object({
        title: commonElements.book.title,
        price: commonElements.book.price,
        available: commonElements.book.available,
        description: commonElements.book.description,
        categoryId: commonElements.book.categoryId,
    }),
}

const deleteBookById = {
    [PARAMS]: Joi.object({
        bookId: commonElements.book.id.required(),
    }),
}

const bookValidator = {
    getBooks,
    createBook,
    getBookById,
    updateBookById,
    deleteBookById,
}

module.exports = bookValidator
