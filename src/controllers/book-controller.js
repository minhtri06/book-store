const createError = require("http-errors")
const { bookService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getBooks = async (req, res) => {
    const books = await bookService.getBooks(req.query)
    return res.json({ books })
}

/** @type {import("express").RequestHandler} */
const createBook = async (req, res) => {
    await bookService.createBook(req.body)
    return res.status(StatusCodes.CREATED).json({ message: "Book created" })
}

const bookController = { getBooks, createBook }

module.exports = bookController
