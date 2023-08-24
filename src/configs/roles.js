const MANAGE_USERS = "manage-users"
const MANAGE_BOOKS = "manage-books"
const MANAGE_SALES = "manage-sales"
const ADMIN = "admin"

const roleConfig = {
    admin: [ADMIN, MANAGE_USERS, MANAGE_BOOKS, MANAGE_SALES],
    salesManager: [MANAGE_SALES],
    user: [],
}

module.exports = {
    rights: { ADMIN, MANAGE_BOOKS, MANAGE_USERS, MANAGE_SALES },
    roles: Object.keys(roleConfig),
    roleRights: new Map(Object.entries(roleConfig)),
}
