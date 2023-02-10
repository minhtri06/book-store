const Joi = require("joi")
const customValidation = require("./utils/custom-validation")
const commonElements = require("./utils/common-elements")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getBooks = {
    [QUERY]: Joi.object({
        title: Joi.string(),
        categoryId: Joi.number().integer(),
        include: commonElements.query.include,
        sortBy: commonElements.query.sortBy(["price", "available", "categoryId"]),
        attributes: commonElements.query.attributes,
        attributesExclude: commonElements.query.attributesExclude,
        limit: commonElements.query.limit,
        page: commonElements.query.page,
        numericFilters: commonElements.query.numericFilters(["price", "available"]),
    }),
}

const bookValidators = { getBooks }

module.exports = bookValidators
