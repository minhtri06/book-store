"use strict"
const { Model, DataTypes } = require("sequelize")
const sequelize = require("../config/sequelize")

class User extends Model {
    static associate({ RefreshToken }) {
        this.hasMany(RefreshToken, {
            foreignKey: "userId",
        })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            passwordHash: undefined,
            createdAt: undefined,
            updatedAt: undefined,
            role: undefined,
            googleId: undefined,
        }
    }
}

User.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        passwordHash: { type: DataTypes.STRING },
        avatar: DataTypes.STRING,
        googleId: { type: DataTypes.STRING },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
        },
    },
    {
        sequelize,
        modelName: "User",
    }
)

module.exports = User
