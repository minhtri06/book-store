const { Op } = require("sequelize")
const createError = require("http-errors")
const { User } = require("../models")
const roleConfig = require("../config/roles")

const meService = {}

module.exports = meService
