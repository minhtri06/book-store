const Joi = require("joi")
const customValidation = require("./utils/custom-validation")
const commonElements = require("./utils/common-elements")
const { Category } = require("../models")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getBooks = {
    [QUERY]: Joi.object({
        title: Joi.string(),
        categoryId: Joi.number().integer(),
        include: commonElements.query.include({ category: Category }),
        sortBy: commonElements.query.sortBy([
            "price",
            "available",
            "categoryId",
            "createdAt",
            "updatedAt",
        ]),
        attributes: commonElements.query.attributes,
        attributesExclude: commonElements.query.attributesExclude,
        limit: commonElements.query.limit,
        page: commonElements.query.page,
        numericFilters: commonElements.query.numericFilters(["price", "available"]),
    }),
}

const createBook = {
    [BODY]: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().required(),
        available: Joi.number().integer().min(0).required(),
        imageUrl: Joi.string(),
        description: Joi.string(),
        categoryId: Joi.number().integer().required(),
    }),
}

const bookValidators = { getBooks, createBook }

module.exports = bookValidators
