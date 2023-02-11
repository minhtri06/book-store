const createError = require("http-errors")
const { ForeignKeyConstraintError, Op } = require("sequelize")

const { Book, Category } = require("../models")
const envConfig = require("../config/env-config")
const { getFilenameFromUrl, deleteCloudFile } = require("../utils")

/**
 *
 * @param {object} options
 * @param {string} [options.name]
 * @param {[]} [options.include]
 * @returns {Promise<InstanceType<Category>[]>}
 */
const getCategories = async ({ name, include }) => {
    const queryOptions = { where: {} }
    if (name) {
        queryOptions.where.name = { [Op.like]: `%${name}%` }
    }
    if (include) {
        queryOptions.include = include
    }
    return Category.findAll(queryOptions)
}

const categoryService = {
    getCategories,
}

module.exports = categoryService
