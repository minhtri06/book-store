/**
 * Get file name from url
 * @param {string} url
 * @returns {string}
 */
const getFilenameFromUrl = (url) => {
    let urlPart = url.split(/.*Book%20Store%20ExpressJS\/(.*)\..*/)[1]
    return "Book Store ExpressJS" + "/" + urlPart
}

module.exports = getFilenameFromUrl
