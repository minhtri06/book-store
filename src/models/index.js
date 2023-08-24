"use strict"
const { Sequelize } = require("sequelize")
const sequelize = require("../configs/sequelize")

const db = {
    Author: require("./author"),
    Book: require("./book"),
    Category: require("./category"),
    Invoice: require("./invoice"),
    InvoiceItem: require("./invoiceItem"),
    RefreshToken: require("./refreshToken"),
    User: require("./user"),
}

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
