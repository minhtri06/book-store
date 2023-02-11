const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { Book } = require("../models")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getCategories = {
    [QUERY]: Joi.object({
        name: commonElements.category.name,
        include: commonElements.query.include({ books: Book }),
    }),
}

const createCategory = {
    [BODY]: Joi.object({
        name: commonElements.category.name.required(),
    }),
}

const getCategoryById = {
    [PARAMS]: Joi.object({
        categoryId: commonElements.category.id.required(),
    }),
    [QUERY]: Joi.object({
        include: commonElements.query.include({ books: Book }),
    }),
}

const categoryValidator = {
    getCategories,
    createCategory,
    getCategoryById,
}

module.exports = categoryValidator
