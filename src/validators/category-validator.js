const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { Book } = require("../models")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getCategories = {
    [QUERY]: Joi.object({
        name: commonElements.category.name,
        include: commonElements.query.include({
            books: { model: Book, attributes: ["title", "price", "available"] },
        }),
    }),
}

const createCategory = {
    [BODY]: Joi.object({ name: commonElements.category.name.required() }),
}

const getCategoryById = {
    [PARAMS]: Joi.object({ categoryId: commonElements.category.id.required() }),
    [QUERY]: Joi.object({
        include: commonElements.query.include({
            books: {
                model: Book,
                attributes: ["title", "price", "available"],
            },
        }),
    }),
}

const updateCategory = {
    [PARAMS]: Joi.object({ categoryId: commonElements.category.id.required() }),
    [BODY]: Joi.object({ name: commonElements.category.name }),
}

const deleteCategory = {
    [PARAMS]: Joi.object({ categoryId: commonElements.category.id.required() }),
}

const categoryValidator = {
    getCategories,
    createCategory,
    getCategoryById,
    updateCategory,
    deleteCategory,
}

module.exports = categoryValidator
