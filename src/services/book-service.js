const { Op } = require("sequelize")

const { Book, Category } = require("../models")
const envConfig = require("../config/env-config")

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

const bookService = { getBooks }

module.exports = bookService
