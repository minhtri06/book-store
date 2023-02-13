const createError = require("http-errors")
const { bookService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getBooks = async (req, res) => {
    const books = await bookService.getBooks(req.query)
    return res.json({ message: "Success", books })
}

/** @type {import("express").RequestHandler} */
const createBook = async (req, res) => {
    if (!req.file) {
        throw createError.InternalServerError("Upload image failed")
    }
    req.body.imageUrl = req.file.path

    await bookService.createBook(req.body, req.file)

    return res.status(StatusCodes.CREATED).json({ message: "Book created" })
}

/** @type {import("express").RequestHandler} */
const getBookById = async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId, req.query)
    if (!book) {
        throw createError.NotFound("Book not found")
    }
    return res.json({ message: "Success", book })
}

/** @type {import("express").RequestHandler} */
const updateBookById = async (req, res) => {
    const book = await bookService.updateBookById(req.params.bookId, req.body, req.file)
    return res.json({ message: "Success", book })
}

/** @type {import("express").RequestHandler} */
const deleteBookById = async (req, res) => {
    await bookService.deleteBookById(req.params.bookId)
    return res.json({ message: "Success" })
}

const bookController = {
    getBooks,
    createBook,
    getBookById,
    updateBookById,
    deleteBookById,
}

module.exports = bookController
