"use strict"
const { Model, DataTypes } = require("sequelize")
const bcryptjs = require("bcryptjs")

const sequelize = require("../configs/sequelize")
const { roles } = require("../configs/roles")

class User extends Model {
    static associate({ RefreshToken, Invoice }) {
        this.hasMany(RefreshToken, { foreignKey: "userId", onDelete: "CASCADE" })
        this.hasMany(Invoice, { foreignKey: "userId", onDelete: "SET NULL" })
    }

    toJSON() {
        return {
            ...super.toJSON(),
            password: undefined,
            createdAt: undefined,
            updatedAt: undefined,
        }
    }

    /**
     * Compare password with hash
     * @param {string} password
     * @returns {boolean}
     */
    comparePassword(password) {
        return bcryptjs.compareSync(password, this.password)
    }
}

User.init(
    {
        name: { type: DataTypes.STRING, allowNull: false },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: "UNQ_USER_USERNAME",
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,

            set(value) {
                const salt = bcryptjs.genSaltSync(10)
                const hash = bcryptjs.hashSync(value, salt)
                this.setDataValue("password", hash)
            },
        },
        avatar: { type: DataTypes.STRING, defaultValue: "" },
        role: { type: DataTypes.ENUM(roles), allowNull: false, defaultValue: "user" },
    },
    {
        sequelize,
        modelName: "User",
    },
)

module.exports = User
