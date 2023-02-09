const { Sequelize } = require("sequelize")
const envConfig = require("./env-config")
const dbConfig = envConfig.db[envConfig.NODE_ENV]

let sequelize
sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USERNAME, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: dbConfig.LOGGING,
})

module.exports = sequelize
