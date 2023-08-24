const createError = require("http-errors")
const { StatusCodes } = require("http-status-codes")

const { bookService } = require("../services")

/** @type {import('express').RequestHandler} */
const createBook = async (req, res) => {
    const newBook = await bookService.createBook(req.body)
    await newBook.reload()
    return res.status(StatusCodes.CREATED).send({ newBook })
}

/** @type {import('express').RequestHandler} */
const deleteBook = async (req, res) => {
    await bookService.deleteBook(req.params.bookId)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const getBooks = async (req, res) => {
    const books = await bookService.queryBooks(req.query)
    return res.json({ books })
}

/** @type {import('express').RequestHandler} */
const getBookById = async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId)
    if (!book) {
        throw createError.NotFound("Book not found")
    }
    return res.json({ book })
}

/** @type {import('express').RequestHandler} */
const updateBook = async (req, res) => {
    await bookService.updateBookById(req.params.bookId, req.body)
    return res.status(StatusCodes.NO_CONTENT).send()
}

/** @type {import('express').RequestHandler} */
const updateBookImage = async (req, res) => {
    const newImage = await bookService.updateBookImage(req.params.bookId, req.file)
    return res.json({ newImage })
}

const bookController = {
    createBook,
    deleteBook,
    getBooks,
    getBookById,
    updateBook,
    updateBookImage,
}

module.exports = bookController
