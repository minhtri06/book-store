"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class BookLike extends Model {
    static associate() {}
}

BookLike.init(
    {
        bookId: { type: DataTypes.INTEGER, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: "BookLike",
    }
)

module.exports = BookLike
