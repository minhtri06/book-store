const createError = require("http-errors")
const { StatusCodes } = require("http-status-codes")

const { categoryService } = require("../services")

/** @type {import('express').RequestHandler} */
const createCategory = async (req, res) => {
    const newCategory = await categoryService.createCategory(req.body)
    return res.status(StatusCodes.CREATED).json({ newCategory })
}

/** @type {import('express').RequestHandler} */
const deleteCategoryById = async (req, res) => {
    await categoryService.deleteCategoryById(req.params.categoryId)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const getAllCategories = async (req, res) => {
    const categories = await categoryService.getAllCategories(req.query)
    return res.status(StatusCodes.OK).json({ categories })
}

/** @type {import('express').RequestHandler} */
const getCategoryById = async (req, res) => {
    const category = await categoryService.getCategoryById(
        req.params.categoryId,
        req.query,
    )
    return res.status(StatusCodes.OK).json({ category })
}

/** @type {import('express').RequestHandler} */
const updateCategoryById = async (req, res) => {
    await categoryService.updateCategoryById(req.params.categoryId, req.body)
    return res.status(StatusCodes.NO_CONTENT).send()
}

module.exports = {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
}
