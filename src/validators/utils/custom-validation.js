const { Op } = require("sequelize")

/**
 *
 * @param {[]} fields
 * @returns {object}
 */
const numericFilters = (fields) => (numericFilters, helpers) => {
    const filterObj = {}
    const operatorMap = {
        "<": Op.lt,
        ">": Op.gt,
        "<=": Op.lte,
        ">=": Op.gte,
        "=": Op.eq,
    }
    for (let comparisonStr of numericFilters.split(",")) {
        const comparisonArr = comparisonStr
            .replace(/\b(<|>|<=|>=|=)\b/, (match) => `-${match}-`)
            .split("-")
        if (comparisonArr.length !== 3) {
            return helpers.message("Invalid numericFilters format")
        }
        const [field, operator, value] = comparisonArr
        if (fields.includes(field)) {
            if (isNaN(value)) {
                return helpers.message("value in numericFilters must be numeric")
            }
            if (!filterObj[field]) {
                filterObj[field] = { [operatorMap[operator]]: Number(value) }
            } else {
                filterObj[field][operatorMap[operator]] = Number(value)
            }
        } else {
            return helpers.message(`field '${field}' is not allowed in numericFilters`)
        }
    }
    return filterObj
}

/**
 *
 * @param {[]} fields
 * @returns {Function}
 */
const sortBy = (fields) => (sortBy, helpers) => {
    const options = []
    for (let order of sortBy.split(",")) {
        let option = order[0] === "-" ? [order.slice(1), "DESC"] : [order]

        if (fields.includes(option[0])) {
            options.push(option)
        } else {
            return helpers.message(`Field '${option[0]}' is not allowed in 'sortBy'`)
        }
    }
    return options
}

/**
 * Split by commas
 * @param {string} value
 * @param {Function} helpers
 * @returns {string[]}
 */
const splitByCommas = (value, helpers) => {
    return value.split(",")
}

/**
 *
 * @param {object} modelMapping
 * @returns {[]}
 */
const queryInclude = (modelMapping) => (value, helpers) => {
    const options = value.split(",")
    const include = []
    for (let option of options) {
        let [model, ...attributes] = option.split(":")
        if (!modelMapping[model]) {
            continue
        }
        if (attributes.length) {
            include.push({ model: modelMapping[model], attributes })
        } else {
            include.push(modelMapping[model])
        }
    }
    console.log(include[0])
    return include
}

const customValidation = {
    query: { numericFilters, sortBy, splitByCommas, include: queryInclude },
}
module.exports = customValidation
