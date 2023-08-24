"use strict"
const { Model, DataTypes } = require("sequelize")

const sequelize = require("../configs/sequelize")

class Book extends Model {
    static associate({ Author, Category, Invoice, InvoiceItem }) {
        this.belongsTo(Author, { foreignKey: "authorId" })
        this.belongsTo(Category, { foreignKey: "categoryId", onDelete: "SET NULL" })
        this.belongsToMany(Invoice, { through: InvoiceItem, foreignKey: "bookId" })
        this.hasMany(InvoiceItem, { foreignKey: "bookId" })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            createdAt: undefined,
            updatedAt: undefined,
        }
    }
}

Book.init(
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            set(value) {
                this.setDataValue("title", value.toUpperCase())
            },
        },
        image: { type: DataTypes.STRING },
        authorId: { type: DataTypes.INTEGER },
        authorName: { type: DataTypes.STRING },
        categoryId: { type: DataTypes.INTEGER },
        categoryName: { type: DataTypes.STRING },
        count: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
        price: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 0 } },
    },
    { sequelize, modelName: "Book", hasTrigger: true },
)

module.exports = Book
