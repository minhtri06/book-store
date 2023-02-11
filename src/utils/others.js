const cloudinary = require("cloudinary").v2

const deleteCloudFile = (fileName) => {
    cloudinary.uploader.destroy(fileName)
}

module.exports = {
    deleteCloudFile,
}
