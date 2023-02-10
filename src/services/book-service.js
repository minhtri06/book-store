const { Op } = require("sequelize")
const createError = require("http-errors")
const { ForeignKeyConstraintError } = require("sequelize")

const { Book, Category } = require("../models")
const envConfig = require("../config/env-config")

/**
 * Check book title exists or not
 * @param {string} title
 * @returns {Promise<Boolean>}
 */
const isBookTitleExist = async (title) => {
    const book = await Book.findOne({ where: { title } })
    return book !== null
}

/**
 * Get books by query option
 * @param {object} options
 * @param {string} [options.title]
 * @param {number} [options.categoryId]
 * @param {string[]} [options.include]
 * @param {[]} [options.sortBy]
 * @param {string[]} [options.attributes]
 * @param {string[]} [options.attributesExclude]
 * @param {number} [options.limit]
 * @param {number} [options.page]
 * @param {[]} [options.numericFilters]
 */
const getBooks = async ({
    title,
    categoryId,
    numericFilters,
    include,
    sortBy,
    attributes,
    attributesExclude,
    limit,
    page,
}) => {
    const queryOptions = { where: {} }
    if (title) {
        queryOptions.where.title = { [Op.like]: `%${title}%` }
    }
    if (categoryId) {
        queryOptions.where.categoryId = categoryId
    }
    if (numericFilters) {
        Object.assign(queryOptions.where, numericFilters)
    }
    if (include) {
        queryOptions.include = include
    }
    if (sortBy) {
        queryOptions.order = sortBy
    }
    if (attributes) {
        queryOptions.attributes = attributes
    } else if (attributesExclude) {
        queryOptions.attributes = { exclude: attributesExclude }
    }
    queryOptions.limit = limit || envConfig.DEFAULT_PAGE_LIMIT
    page = page || 1
    queryOptions.offset = (page - 1) * queryOptions.limit
    return Book.findAll(queryOptions)
}

/**
 * Create book
 * @param {object} bookBody
 * @returns {Promise<InstanceType<Book>>}
 */
const createBook = async (bookBody) => {
    try {
        if (await isBookTitleExist(bookBody.title)) {
            throw createError.BadRequest("Book's title already exists")
        }

        return await Book.create(bookBody)
    } catch (error) {
        if (error instanceof ForeignKeyConstraintError) {
            throw createError.BadRequest("Category id does not exist")
        }
        throw error
    }
}

/**
 *
 * @param {number} id
 * @returns {Promise<InstanceType<Book>}
 */
const getBookById = async (id) => {
    return Book.findByPk(id)
}

const bookService = { isBookTitleExist, getBooks, createBook, getBookById }

module.exports = bookService
