"use strict"
const { Sequelize } = require("sequelize")
const sequelize = require("../config/sequelize")

const db = {
    User: require("./user"),
    RefreshToken: require("./refresh-token"),
    Category: require("./category"),
    Book: require("./book"),
    BookLike: require("./book-like"),
}

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
