const createError = require("http-errors")
const { categoryService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getCategories = async (req, res) => {
    let categories = await categoryService.getCategories(req.query)

    return res.json({ message: "Success", categories })
}

/** @type {import("express").RequestHandler} */
const createCategory = async (req, res) => {
    const category = await categoryService.createCategory(req.body)
    return res.status(StatusCodes.CREATED).json({ message: "Success", category })
}

/** @type {import("express").RequestHandler} */
const getCategoryById = async (req, res) => {
    const category = await categoryService.getCategoryById(
        req.params.categoryId,
        req.query
    )
    if (!category) {
        throw createError.NotFound("Category not found")
    }
    return res.json({ message: "Success", category })
}

/** @type {import("express").RequestHandler} */
const getBooksOfCategory = async (req, res) => {
    const books = await categoryService.getBooksOfCategory(
        req.params.categoryId,
        req.query
    )
    return res.json({ message: "Success", books })
}

/** @type {import("express").RequestHandler} */
const updateCategory = async (req, res) => {
    await categoryService.updateCategoryById(req.params.categoryId, req.body)
    return res.json({ message: "Success" })
}

/** @type {import("express").RequestHandler} */
const deleteCategory = async (req, res) => {
    await categoryService.deleteCategoryById(req.params.categoryId)
    return res.json({ message: "Success" })
}

const categoryController = {
    getCategories,
    createCategory,
    getCategoryById,
    getBooksOfCategory,
    updateCategory,
    deleteCategory,
}

module.exports = categoryController
