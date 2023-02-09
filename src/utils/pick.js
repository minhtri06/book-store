/**
 *
 * @param {object} object
 * @param {string[]} props
 * @returns
 */
const pick = (object, props) => {
    const newObj = {}
    if (!object) {
        return newObj
    }
    props.forEach((prop) => {
        if (object[prop]) {
            newObj[prop] = object[prop]
        }
    })
    return newObj
}

module.exports = pick
