"use strict"
const { Model, DataTypes } = require("sequelize")

const sequelize = require("../configs/sequelize")

class Invoice extends Model {
    static associate({ User, Book, InvoiceItem }) {
        this.belongsTo(User, { foreignKey: "userId" })
        this.belongsToMany(Book, { through: InvoiceItem, foreignKey: "invoiceId" })
        this.hasMany(InvoiceItem, { foreignKey: "invoiceId" })
    }

    toJSON() {
        return { ...super.toJSON(), updatedAt: undefined }
    }
}

Invoice.init(
    {
        userId: { type: DataTypes.INTEGER },
        phoneNumber: { type: DataTypes.STRING, allowNull: false },
        address: { type: DataTypes.STRING, allowNull: false },
        totalPayment: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: { min: 0 },
            defaultValue: 0,
        },
    },
    { sequelize, modelName: "Invoice" },
)

module.exports = Invoice
