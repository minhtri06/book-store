const createError = require("http-errors")
const { bookService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getBooks = async (req, res) => {
    const books = await bookService.getBooks(req.query)
    return res.json({ books })
}

const bookController = { getBooks }

module.exports = bookController
