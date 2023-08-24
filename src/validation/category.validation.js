const Joi = require("joi")
const { query, book, category } = require("./common")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request

const createCategory = {
    [BODY]: Joi.object({ name: category.name.required() }),
}

const deleteCategoryById = {
    [PARAMS]: Joi.object({ categoryId: category.id.required() }),
}

const getAllCategories = {
    [QUERY]: Joi.object({ includeBooks: Joi.bool() }),
}

const getCategoryById = {
    [PARAMS]: Joi.object({ categoryId: category.id.required() }),
    [QUERY]: Joi.object({ includeBooks: Joi.bool() }),
}

const updateCategoryById = {
    [PARAMS]: Joi.object({ categoryId: category.id.required() }),
    [BODY]: Joi.object({ name: category.name }),
}

module.exports = {
    createCategory,
    deleteCategoryById,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
}
