const Joi = require("joi")
const commonElements = require("./utils/common-elements")
const { Book } = require("../models")
const { BODY, PARAMS, QUERY } = require("../utils").commonConstants

const getCategories = {
    [QUERY]: Joi.object({
        include: commonElements.query.include({ books: Book }),
        limit: commonElements.query.limit,
        page: commonElements.query.page,
    }),
}

const categoryValidator = { getCategories }

module.exports = categoryValidator
