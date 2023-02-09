const envConfig = require("../config/env-config")
const createError = require("http-errors")
const { PRODUCTION } = require("../utils").commonConstants

const handleException = async (err, req, res, next) => {
    if (envConfig.NODE_ENV !== PRODUCTION) {
        if (err instanceof createError.HttpError) {
            return res.status(err.statusCode).json({ error: err.message })
        } else {
            console.log(err)
            return res.status(500).json({ error: err.message })
        }
    } else {
        if (err instanceof createError.HttpError) {
            return res.status(err.statusCode).json({ error: err.message })
        } else {
            return res.status(500).json({ error: "Something went wrong" })
        }
    }
}

module.exports = handleException
