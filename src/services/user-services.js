const { Op } = require("sequelize")
const createError = require("http-errors")
const bcrypt = require("bcryptjs")
const { User } = require("../models")
const { deleteCloudFile, getFilenameFromUrl } = require("../utils")

/**
 *
 * @param {string} password
 * @returns {string}
 */
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}

/**
 * Verify password with password hash
 * @param {string} password
 * @param {string} hash
 * @returns {Promise<Boolean>}
 */
const verifyPassword = async (password, hash) => {
    return bcrypt.compare(password, hash)
}

/**
 * Get users by query option
 * @param {object} options
 * @param {string} [options.name]
 * @param {string} [options.role]
 * @param {[]} [options.sortBy]
 * @param {string[]} [options.attributes]
 * @param {number} [options.limit]
 * @param {number} [options.page]
 */
const getUsers = async ({ name, role, sortBy, attributes, limit, page }) => {
    const queryOptions = { where: {} }

    if (name) {
        queryOptions.where.name = { [Op.like]: `%${name}%` }
    }
    if (role) {
        queryOptions.where.role = role
    }
    if (sortBy) {
        queryOptions.order = sortBy
    }
    if (attributes) {
        queryOptions.attributes = attributes
    }
    queryOptions.limit = limit || 10
    page = page || 1
    queryOptions.offset = (page - 1) * queryOptions.limit

    return User.findAll(queryOptions)
}

/**
 * Get all users
 * @returns {Promise<InstanceType<User>[]>}
 */
const getAllUsers = async () => {
    User.findAll()
}

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<InstanceType<User>>}
 */
const getUserById = async (id) => {
    return User.findByPk(id)
}

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<InstanceType<User>|null>}
 */
const getUserByEmail = async (email) => {
    return User.findOne({ where: { email } })
}

/**
 * Get user by google id
 * @param {string} googleId
 * @returns {Promise<InstanceType<User>|null>}
 */
const getUserByGoogleId = async (googleId) => {
    return User.findOne({ where: { googleId } })
}

/**
 * Check email exists or not
 * @param {number} id
 * @returns {Promise<Boolean>}
 */
const checkIdExist = async (id) => {
    const user = await User.findByPk(id)
    return user !== null
}

/**
 * Check email exists or not
 * @param {string} email
 * @returns {Promise<Boolean>}
 */
const checkEmailExist = async (email) => {
    const user = await User.findOne({ where: { email } })
    return user !== null
}

/**
 *
 * @param {object} userBody
 * @param {string} [userBody.name]
 * @param {string} [userBody.email]
 * @param {string} [userBody.password]
 * @param {string} [userBody.googleId]
 * @param {string} [userBody.avatar]
 * @param {string} [userBody.role]
 */
const createUser = async (userBody, avatarFile = undefined) => {
    try {
        if (await checkEmailExist(userBody.email)) {
            throw createError.BadRequest("Email has been used")
        }
        if (userBody.password) {
            userBody.passwordHash = await hashPassword(userBody.password)
        }
        if (avatarFile) {
            userBody.avatar = avatarFile.path
        }
        const user = await User.create(userBody)
        return user
    } catch (error) {
        if (avatarFile) {
            deleteCloudFile(avatarFile.filename)
        }
        throw error
    }
}

/**
 *
 * @param {number} id
 * @param {object} [updateBody]
 * @param {string} [updateBody.name]
 * @param {string} [updateBody.email]
 * @param {string} [updateBody.password]
 * @param {string} [updateBody.avatar]
 * @param {string} [updateBody.role]
 * @returns
 */
const updateUserById = async (id, updateBody, newAvatarFile = undefined) => {
    try {
        const user = await getUserById(id)
        if (!user) {
            throw createError.NotFound("User not found")
        }
        if (
            updateBody.email &&
            user.email !== updateBody.email &&
            (await checkEmailExist(updateBody.email))
        ) {
            throw createError.BadRequest("Email has been used")
        }
        if (updateBody.password) {
            updateBody.passwordHash = await hashPassword(updateBody.password)
        }
        let oldAvatarFilename
        if (newAvatarFile) {
            oldAvatarFilename = getFilenameFromUrl(user.avatar)
            updateBody.avatar = newAvatarFile.path
        }

        await user.update(updateBody)

        if (newAvatarFile) {
            deleteCloudFile(oldAvatarFilename)
        }

        return user
    } catch (error) {
        if (newAvatarFile) {
            deleteCloudFile(newAvatarFile.filename)
        }
        throw error
    }
}

const deleteUserById = async (id) => {
    const user = await getUserById(id)
    if (!user) {
        throw createError.NotFound("User not found")
    }
    const avatarFilename = getFilenameFromUrl(user.avatar)
    await user.destroy()
    deleteCloudFile(avatarFilename)
    return user
}

const getUserByEmailAndPassword = async (email, password) => {
    const user = await getUserByEmail(email)
    if (!user || !(await verifyPassword(password, user.passwordHash))) {
        return null
    }
    return user
}

const userService = {
    hashPassword,
    verifyPassword,
    getUsers,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByGoogleId,
    checkEmailExist,
    checkIdExist,
    createUser,
    updateUserById,
    deleteUserById,
    getUserByEmailAndPassword,
}

module.exports = userService
