const { Op } = require("sequelize")
const createError = require("http-errors")
const { ForeignKeyConstraintError } = require("sequelize")
const cloudinary = require("cloudinary").v2

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
            throw createError.BadRequest("Invalid association")
        }
        throw error
    }
}

/**
 *
 * @param {number} id
 * @returns {Promise<InstanceType<Book>>}
 */
const getBookById = async (id) => {
    return Book.findByPk(id)
}

/**
 *
 * @param {number} id
 * @param {object} updateBody
 * @param {string} [updateBody.title]
 * @param {number} [updateBody.price]
 * @param {number} [updateBody.available]
 * @param {string} [updateBody.imageUrl]
 * @param {string} [updateBody.description]
 * @param {number} [updateBody.categoryId]
 * @param {object} uploadedFile
 * @returns {Promise}
 */
const updateBookById = async (id, updateBody, uploadedFile = null) => {
    try {
        const book = await Book.findByPk(id)
        if (!book) {
            throw createError.NotFound("Book not found")
        }

        if (updateBody.title) {
            if (await isBookTitleExist(updateBody.title)) {
                throw createError.BadRequest("Book's title already exists")
            }
        }
        if (uploadedFile) {
            updateBody.imageUrl = uploadedFile.path
        }

        await book.update(updateBody)

        return book
    } catch (error) {
        if (uploadedFile) {
            cloudinary.uploader.destroy(uploadedFile.filename)
        }
        if (error instanceof ForeignKeyConstraintError) {
            throw createError.BadRequest("Invalid association")
        }
        throw error
    }
}

const bookService = {
    isBookTitleExist,
    getBooks,
    createBook,
    getBookById,
    updateBookById,
}

module.exports = bookService
