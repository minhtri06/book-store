const author = require("./author")
const category = require("./category")
const Joi = require("joi")

module.exports = {
    id: Joi.number().integer(),
    title: Joi.string(),
    image: Joi.string(),
    authorId: author.id,
    authorName: author.name,
    categoryId: category.id,
    categoryName: category.name,
    count: Joi.number().integer().min(0),
    price: Joi.number().integer().min(0),
}
