"use strict"
const { Model, DataTypes } = require("sequelize")

const sequelize = require("../configs/sequelize")

class RefreshToken extends Model {
    static associate({ User }) {
        this.belongsTo(User, { foreignKey: "userId" })
    }
}

RefreshToken.init(
    {
        token: { type: DataTypes.STRING, allowNull: false },
        expires: { type: DataTypes.DATE, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        hasRevoked: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        isUsed: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        isBlacklisted: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    },
    { sequelize, modelName: "RefreshToken" }
)

module.exports = RefreshToken
