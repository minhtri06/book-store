"use strict"
const { Model, DataTypes } = require("sequelize")

const sequelize = require("../configs/sequelize")

class Author extends Model {
    static associate({ Book }) {
        this.hasMany(Book, { foreignKey: "authorId", onDelete: "SET NULL" })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            createdAt: undefined,
            updatedAt: undefined,
        }
    }
}

Author.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue("name", value.toUpperCase())
            },
        },
        image: { type: DataTypes.STRING },
    },
    { sequelize, modelName: "Author", hasTrigger: true },
)

module.exports = Author
