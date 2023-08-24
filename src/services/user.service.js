const createError = require("http-errors")

const { User } = require("../models")
const envConfig = require("../configs/envConfig")
const { updateImage } = require("../utils")

const doesUsernameExist = async (username) => {
    const user = await User.findOne({ where: { username } })
    return user !== null
}

const getUserById = async (userId) => {
    return await User.findByPk(userId)
}

const getUserByUsername = async (username) => {
    return await User.findOne({ where: { username } })
}

const queryUsers = async ({ role, limit, page }, raw = true) => {
    const queryOptions = { where: {}, attributes: { exclude: "password" }, raw }

    if (role) {
        queryOptions.where.role = role
    }
    queryOptions.limit = limit || envConfig.DEFAULT_PAGE_LIMIT
    page = page || 1
    queryOptions.offset = (page - 1) * queryOptions.limit

    return await User.findAll(queryOptions)
}

/**
 * Create user
 * @param {object} userBody
 * @returns {Promise<InstanceType<User>>}
 */
const createUser = async (userBody) => {
    const user = await User.create(userBody)
    return user
}

/**
 * Update a user by id
 * @param {number} userId
 * @param {object} updateBody
 * @returns {Promise<InstanceType<User>>}
 */
const updateUserById = async (userId, updateBody) => {
    const user = await getUserById(userId)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    await user.update(updateBody)
    return user
}

/**
 * Replace user avatar
 * @param {number} userId
 * @param {object} avatarFile
 * @param {string} [avatarFile.path]
 * @returns {Promise<string>}
 */
const replaceAvatar = async (userId, avatarFile) => {
    return await updateImage(getUserById(userId), "User", "avatar", avatarFile)
}

/**
 * Delete a user by id
 * @param {number} userId
 * @returns {Promise}
 */
const deleteUserById = async (userId) => {
    const user = await getUserById(userId)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    await user.destroy()
}

module.exports = {
    doesUsernameExist,
    getUserById,
    getUserByUsername,
    queryUsers,
    createUser,
    updateUserById,
    replaceAvatar,
    deleteUserById,
}
