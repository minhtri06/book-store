const createError = require("http-errors")
const { ForeignKeyConstraintError, Op } = require("sequelize")

const { Book, Category } = require("../models")
const envConfig = require("../config/env-config")
const { getFilenameFromUrl, deleteCloudFile } = require("../utils")

/**
 * Check book title exists or not
 * @param {string} title
 * @returns {Promise<Boolean>}
 */
const doesBookTitleExist = async (title) => {
    const book = await Book.findOne({ where: { title } })
    return book !== null
}

/**
 *
 * @param {string} title
 * @param {number} bookId
 * @returns {Promise<Boolean>}
 */
const doesAnotherBookWithThisTitleExist = async (title, bookId) => {
    const book = await Book.findOne({ where: { title, id: { [Op.ne]: bookId } } })
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
const createBook = async (bookBody, imageFile = null) => {
    try {
        if (await doesBookTitleExist(bookBody.title)) {
            throw createError.BadRequest("Book's title already exists")
        }
        if (imageFile) {
            bookBody.imageUrl = imageFile.path
        }

        await Book.create(bookBody)
    } catch (error) {
        if (imageFile) {
            deleteCloudFile(imageFile.filename)
        }
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
 * @param {object} newImageFile
 * @returns {Promise}
 */
const updateBookById = async (id, updateBody, newImageFile = null) => {
    try {
        const book = await Book.findByPk(id)
        if (!book) {
            throw createError.NotFound("Book not found")
        }

        if (updateBody.title) {
            if (await doesAnotherBookWithThisTitleExist(updateBody.title, id)) {
                throw createError.BadRequest("Book's title already exists")
            }
        }
        let oldImageFilename
        if (newImageFile) {
            oldImageFilename = getFilenameFromUrl(book.imageUrl)
            updateBody.imageUrl = newImageFile.path
        }

        await book.update(updateBody)

        if (newImageFile) {
            deleteCloudFile(oldImageFilename)
        }
        return book
    } catch (error) {
        if (newImageFile) {
            deleteCloudFile(newImageFile.filename)
        }
        if (error instanceof ForeignKeyConstraintError) {
            throw createError.BadRequest("Invalid association")
        }
        throw error
    }
}

const deleteBookById = async (id) => {
    const book = await Book.findByPk(id)
    if (!book) {
        throw createError.NotFound("Book not found")
    }
    const imageUrl = book.imageUrl
    await book.destroy()
    const filename = getFilenameFromUrl(imageUrl)
    deleteCloudFile(filename)
}

const bookService = {
    doesBookTitleExist,
    getBooks,
    createBook,
    getBookById,
    updateBookById,
    deleteBookById,
}

module.exports = bookService
