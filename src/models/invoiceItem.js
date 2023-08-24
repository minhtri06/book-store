"use strict"
const { Model, DataTypes } = require("sequelize")

const sequelize = require("../configs/sequelize")

class InvoiceItem extends Model {
    static associate({ Invoice, Book }) {
        this.belongsTo(Invoice, { foreignKey: "invoiceId" })
        this.belongsTo(Book, { foreignKey: "bookId" })
    }

    toJSON() {
        return { ...super.toJSON(), updatedAt: undefined }
    }
}

InvoiceItem.init(
    {
        price: { type: DataTypes.INTEGER, validate: { min: 0 } },
        quantity: { type: DataTypes.INTEGER, validate: { min: 1 }, allowNull: false },
        totalPrice: { type: DataTypes.INTEGER, validate: { min: 0 } },
    },
    { sequelize, modelName: "InvoiceItem", hasTrigger: true },
)

module.exports = InvoiceItem
