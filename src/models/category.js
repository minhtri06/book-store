"use strict"
const { Model, DataTypes } = require("sequelize")

const sequelize = require("../configs/sequelize")

class Category extends Model {
    static associate({ Book }) {
        this.hasMany(Book, { foreignKey: "categoryId", onDelete: "SET NULL" })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            createdAt: undefined,
            updatedAt: undefined,
        }
    }
}

Category.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue("name", value.toUpperCase())
            },
        },
    },
    { sequelize, modelName: "Category" },
)

module.exports = Category
