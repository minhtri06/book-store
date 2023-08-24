const createError = require("http-errors")
const { StatusCodes } = require("http-status-codes")

const { authorService, bookService } = require("../services")

/** @type {import('express').RequestHandler} */
const createAuthor = async (req, res) => {
    const newBook = await authorService.createAuthor(req.body)
    return res.status(StatusCodes.CREATED).json({ newBook })
}

/** @type {import('express').RequestHandler} */
const deleteAuthor = async (req, res) => {
    await authorService.deleteAuthorById(req.params.authorId)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const getAllAuthors = async (req, res) => {
    const authors = await authorService.getAllAuthors()
    return res.json({ authors })
}

/** @type {import('express').RequestHandler} */
const getAuthorById = async (req, res) => {
    const author = await authorService.getAuthorById(req.params.authorId)
    if (!author) {
        throw createError.NotFound("Author not found")
    }
    return res.json({ author })
}

/** @type {import('express').RequestHandler} */
const getAllBooksOfAuthor = async (req, res) => {
    const books = await bookService.queryBooks({
        authorId: req.params.authorId,
        getAll: true,
    })
    return res.json({ books })
}

/** @type {import('express').RequestHandler} */
const updateAuthor = async (req, res) => {
    await authorService.updateAuthorById(req.params.authorId, req.body)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const updateAuthorImage = async (req, res) => {
    const newImage = await authorService.updateAuthorImage(req.params.authorId, req.file)
    return res.json({ newImage })
}

module.exports = {
    createAuthor,
    deleteAuthor,
    getAllAuthors,
    getAllBooksOfAuthor,
    getAuthorById,
    updateAuthor,
    updateAuthorImage,
}
