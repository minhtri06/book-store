const createError = require("http-errors")

const { deleteFile } = require("./file")
const { STATIC_DIRNAME } = require("../configs/commonConstants")

/**
 * @param {Promise} getterPromise
 * @param {string} imageField
 * @param {object} imageFile
 * @returns
 */
const updateImage = async (instanceGetter, modelName, imageField, imageFile) => {
    if (!imageFile) {
        throw createError.BadRequest(`${modelName} ${imageField} is required`)
    }
    let oldImage
    let newImage
    try {
        const modelInst = await instanceGetter
        if (!modelInst) {
            throw createError.NotFound(`${modelName} not found`)
        }

        oldImage = modelInst[imageField]
        newImage = "/" + imageFile.path.split("/static/")[1]

        await modelInst.update({ [imageField]: newImage })
    } catch (error) {
        // If have any error => delete the new image and throw error
        await deleteFile(imageFile.path)
        throw error
    }
    if (oldImage) {
        // If don't have any error and old image is not null => delete the old image file
        await deleteFile(STATIC_DIRNAME + oldImage)
    }
    return newImage
}

module.exports = updateImage
