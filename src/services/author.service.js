const createError = require("http-errors")

const {
    updateImage,
    file: { deleteStaticFile },
} = require("../utils")
const { Author } = require("../models")

const createAuthor = async (authorBody) => {
    authorBody.image = undefined
    return await Author.create(authorBody)
}

const deleteAuthorById = async (authorId) => {
    const author = await getAuthorById(authorId)
    if (!author) {
        throw createError.NotFound("Author not found")
    }
    const authorImage = author.image
    await author.destroy()

    if (authorImage) {
        await deleteStaticFile(authorImage)
    }
}

const getAuthorById = async (authorId, options = {}) => {
    return await Author.findByPk(authorId, options)
}

const getAllAuthors = async (options = {}) => {
    return await Author.findAll(options)
}

const updateAuthorById = async (authorId, updateBody) => {
    const author = await getAuthorById(authorId)
    if (!author) {
        throw createError.NotFound("Author not found")
    }
    await author.update(updateBody)
    return author
}

const updateAuthorImage = async (authorId, imageFile) => {
    return await updateImage(getAuthorById(authorId), "Author", "image", imageFile)
}

module.exports = {
    createAuthor,
    deleteAuthorById,
    getAuthorById,
    getAllAuthors,
    updateAuthorById,
    updateAuthorImage,
}
