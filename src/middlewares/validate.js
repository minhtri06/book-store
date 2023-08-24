const createError = require("http-errors")
const { BODY, QUERY, PARAMS, FILE } = require("../configs/commonConstants").request
const { deleteFile } = require("../utils").file

const validate = (schema) => async (req, res, next) => {
    for (let prop of [BODY, QUERY, PARAMS, FILE]) {
        if (!schema[prop]) {
            continue
        }
        const { value, error } = schema[prop].validate(req[prop], {
            errors: { wrap: { label: "'" } },
        })
        if (error) {
            if (req.file) {
                await deleteFile(req.file.path)
            }
            next(new createError.BadRequest(`Request error (${prop}): ${error.message}`))
        } else {
            req[prop] = value
        }
    }

    return next()
}

module.exports = validate
