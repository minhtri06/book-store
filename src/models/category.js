"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class Category extends Model {
    static associate({ Book }) {
        this.hasMany(Book, { foreignKey: "categoryId" })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            bookCount: this.Books ? this.Books.length : undefined,
        }
    }
}

Category.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
    },
    {
        sequelize,
        modelName: "Category",
    }
)

module.exports = Category
