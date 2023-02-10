const createError = require("http-errors")
const cloudinary = require("cloudinary").v2
const { BODY, QUERY, PARAMS } = require("../utils").commonConstants

const validate = (schema) => (req, res, next) => {
    for (let prop of [BODY, QUERY, PARAMS]) {
        if (!schema[prop]) {
            continue
        }
        const { value, error } = schema[prop].validate(req[prop], {
            errors: { wrap: { label: "'" } },
        })
        if (error) {
            if (req.file) {
                cloudinary.uploader.destroy(req.file.filename)
            }
            next(new createError.BadRequest(`Request error (${prop}): ${error.message}`))
        } else {
            req[prop] = value
        }
    }

    return next()
}

module.exports = validate
