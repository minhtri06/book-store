const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")
const multer = require("multer")

const envConfig = require("../config/env-config")

cloudinary.config({
    cloud_name: envConfig.cloudinary.NAME,
    api_key: envConfig.cloudinary.API_KEY,
    api_secret: envConfig.cloudinary.API_SECRET,
})

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ["jpg", "png"],
    params: {
        folder: "Book Store ExpressJS",
    },
})

const uploadCloud = multer({ storage })

module.exports = uploadCloud
