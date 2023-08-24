const { promisify } = require("util")
const fs = require("fs")
const { STATIC_DIRNAME } = require("../configs/commonConstants")

const unlinkAsync = promisify(fs.unlink)

const deleteFile = async (path) => {
    await unlinkAsync(path)
}

const deleteStaticFile = async (relativePath) => {
    await deleteFile(STATIC_DIRNAME + relativePath)
}

module.exports = {
    deleteFile,
    deleteStaticFile,
}
