const router = require("express").Router()
const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { GET_USERS, MANAGE_USERS } = require("../utils").commonConstants.rights

module.exports = router
