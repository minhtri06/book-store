const Joi = require("joi")
const { author } = require("./common")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request

const createAuthor = { [BODY]: Joi.object({ name: author.name.required() }) }

const deleteAuthor = { [PARAMS]: Joi.object({ authorId: author.id.required() }) }

const getAllBooksOfAuthor = { [PARAMS]: Joi.object({ authorId: author.id.required() }) }

const getAuthorById = { [PARAMS]: Joi.object({ authorId: author.id.required() }) }

const updateAuthor = {
    [PARAMS]: Joi.object({ authorId: author.id.required() }),
    [BODY]: Joi.object({ name: author.name }),
}

const updateAuthorImage = { [PARAMS]: Joi.object({ authorId: author.id.required() }) }

module.exports = {
    createAuthor,
    deleteAuthor,
    getAllBooksOfAuthor,
    getAuthorById,
    updateAuthor,
    updateAuthorImage,
}
