const createError = require("http-errors")
const { bookService } = require("../services")
const { StatusCodes } = require("http-status-codes")
const cloudinary = require("cloudinary").v2

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

    try {
        await bookService.createBook(req.body)
    } catch (error) {
        cloudinary.uploader.destroy(req.file.filename)
        throw error
    }

    return res.status(StatusCodes.CREATED).json({ message: "Book created" })
}

/** @type {import("express").RequestHandler} */
const getBookById = async (req, res) => {
    const book = await bookService.getBookById(req.params.bookId)
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

const bookController = { getBooks, createBook, getBookById, updateBookById }

module.exports = bookController
