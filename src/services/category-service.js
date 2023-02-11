const createError = require("http-errors")
const { ForeignKeyConstraintError, Op } = require("sequelize")

const { Book, Category } = require("../models")
const envConfig = require("../config/env-config")
const { getFilenameFromUrl, deleteCloudFile } = require("../utils")

/**
 *
 * @param {string} name
 * @returns {Promise<Boolean>}
 */
const doesCategoryNameExist = async (name) => {
    const category = await Category.findOne({ where: { name } })
    return category !== null
}

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

/**
 *
 * @param {object} categoryBody
 * @param {string} [categoryBody.name]
 * @returns {Promise<InstanceType<Category>>}
 */
const createCategory = async (categoryBody) => {
    if (await doesCategoryNameExist(categoryBody.name)) {
        throw createError.BadRequest("Category's name already exists")
    }
    return Category.create(categoryBody)
}

/**
 *
 * @param {number} id
 * @param {[]} include
 * @returns {Promise<InstanceType<Category>>}
 */
const getCategoryById = async (id, { include = undefined }) => {
    return Category.findByPk(id, { include })
}

const categoryService = {
    getCategories,
    createCategory,
    getCategoryById,
}

module.exports = categoryService
