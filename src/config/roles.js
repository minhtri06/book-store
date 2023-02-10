const { GET_USERS, MANAGE_USERS, MANAGE_BOOKS } =
    require("../utils").commonConstants.rights

let roleInfo = {
    user: [],
    admin: [GET_USERS, MANAGE_USERS, MANAGE_BOOKS],
}

const roles = Object.keys(roleInfo)
const roleRights = new Map(Object.entries(roleInfo))

const roleConfig = {
    roles,
    roleRights,
}

module.exports = roleConfig
