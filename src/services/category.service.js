const { UniqueConstraintError } = require("sequelize")
const createError = require("http-errors")

const { Category, Book } = require("../models")

const createCategory = async (categoryBody) => {
    return await Category.create(categoryBody)
}

const deleteCategoryById = async (categoryId) => {
    // console.log(categoryId)
    // const destroyCount = await Category.destroy({ where: { id: categoryId } })
    // if (destroyCount === 0) {
    //     throw createError.NotFound("Category not found")
    // }
    const category = await Category.findByPk(categoryId)
    if (!category) {
        throw createError.NotFound("Category not found")
    }
    await category.destroy()
}

const getAllCategories = async ({ includeBooks } = {}) => {
    return await Category.findAll({ include: includeBooks ? [Book] : [] })
}

const getCategoryById = async (categoryId, { includeBooks } = {}) => {
    const category = await Category.findByPk(categoryId, {
        include: includeBooks ? [Book] : [],
    })
    if (!category) {
        throw createError.NotFound("Category not found")
    }
    return category
}

const updateCategoryById = async (categoryId, updateBody) => {
    if (Object.keys(updateBody).length === 0) {
        return
    }
    const [rowAffected] = await Category.update(updateBody, { where: { id: categoryId } })
    if (rowAffected === 0) {
        throw createError.NotFound("Category not found")
    }
}

module.exports = {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
}
