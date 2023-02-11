const createError = require("http-errors")
const { categoryService } = require("../services")
const { StatusCodes } = require("http-status-codes")

/** @type {import("express").RequestHandler} */
const getCategories = async (req, res) => {
    let categories = await categoryService.getCategories(req.query)

    return res.json({ message: "Success", categories })
}

const categoryController = { getCategories }

module.exports = categoryController
