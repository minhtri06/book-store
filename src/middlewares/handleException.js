const createError = require("http-errors")
const { BaseError: SequelizeBaseError } = require("sequelize")
const { StatusCodes } = require("http-status-codes")

const { PRODUCTION } = require("../configs/commonConstants").nodeEnv
const envConfig = require("../configs/envConfig")

/** @type {import('express').ErrorRequestHandler} */
const handleException = async (err, req, res, next) => {
    if (envConfig.NODE_ENV !== PRODUCTION) {
        if (err instanceof createError.HttpError) {
            return res.status(err.statusCode).json({ message: err.message })
        } else if (err instanceof SequelizeBaseError) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ message: err.message.replaceAll('"', "'") })
        } else {
            console.log(err)
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: err.message })
        }
    } else {
        if (err instanceof createError.HttpError) {
            return res.status(err.statusCode).json({ message: err.message })
        } else if (err instanceof SequelizeBaseError) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Bad request" })
        } else {
            return res
                .status(StatusCodes.INTERNAL_SERVER_ERROR)
                .json({ message: "Something went wrong" })
        }
    }
}

module.exports = handleException
