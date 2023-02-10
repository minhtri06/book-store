"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class Book extends Model {
    static associate({ Category }) {
        this.belongsTo(Category, { foreignKey: "categoryId" })
    }
}

Book.init(
    {
        title: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        available: { type: DataTypes.INTEGER, allowNull: false },
        imageUrl: { type: DataTypes.STRING, defaultValue: "" },
        description: { type: DataTypes.TEXT, defaultValue: "" },
        categoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
        sequelize,
        modelName: "Book",
    }
)

module.exports = Book
