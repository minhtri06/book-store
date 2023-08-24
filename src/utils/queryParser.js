/**
 * @param {string} preValue
 * @param {string[]} allowedField
 * @returns {[]}
 */
const orderBy = (preValue, allowedField) => {
    const options = []
    for (let order of preValue.split(",")) {
        let option = order[0] === "-" ? [order.slice(1), "DESC"] : [order]

        if (allowedField.includes(option[0])) {
            options.push(option)
        }
    }
    return options
}

module.exports = {
    orderBy,
}
