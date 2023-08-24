const Joi = require("joi")
const { DEVELOPMENT, PRODUCTION, TEST } = require("./commonConstants").nodeEnv
require("dotenv").config()

const envSchema = Joi.object({
    PORT: Joi.number().integer().required(),
    CLIENT_URL: Joi.string().required(),
    NODE_ENV: Joi.string().allow(DEVELOPMENT, PRODUCTION, TEST).required(),
    DEFAULT_PAGE_LIMIT: Joi.number().integer().required(),

    JWT_SECRET_KEY: Joi.string().required(),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().integer().required(),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().integer().required(),

    DB_DEV_USERNAME: Joi.string().required(),
    DB_DEV_PASSWORD: Joi.string().required(),
    DB_DEV_DATABASE: Joi.string().required(),
    DB_DEV_HOST: Joi.string().required(),
    DB_DEV_DIALECT: Joi.string().required(),
    DB_DEV_LOGGING: Joi.boolean().required(),

    DB_PROD_USERNAME: Joi.string().required(),
    DB_PROD_PASSWORD: Joi.string().required(),
    DB_PROD_DATABASE: Joi.string().required(),
    DB_PROD_HOST: Joi.string().required(),
    DB_PROD_DIALECT: Joi.string().required(),
    DB_PROD_LOGGING: Joi.boolean().required(),

    DB_TEST_USERNAME: Joi.string().required(),
    DB_TEST_PASSWORD: Joi.string().required(),
    DB_TEST_DATABASE: Joi.string().required(),
    DB_TEST_HOST: Joi.string().required(),
    DB_TEST_DIALECT: Joi.string().required(),
    DB_TEST_LOGGING: Joi.boolean().required(),
}).unknown()

const { value: envVars, error } = envSchema.validate(process.env)
if (error) {
    throw new Error("Config validation error: " + error.message)
}

const envConfig = {
    PORT: envVars.PORT,
    CLIENT_URL: envVars.CLIENT_URL,
    NODE_ENV: envVars.NODE_ENV,
    DEFAULT_PAGE_LIMIT: envVars.DEFAULT_PAGE_LIMIT,

    jwt: {
        SECRET_KEY: envVars.JWT_SECRET_KEY,
        ACCESS_EXPIRATION_MINUTES: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
        REFRESH_EXPIRATION_DAYS: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    },

    db: {
        [DEVELOPMENT]: {
            USERNAME: envVars.DB_DEV_USERNAME,
            PASSWORD: envVars.DB_DEV_PASSWORD,
            DATABASE: envVars.DB_DEV_DATABASE,
            HOST: envVars.DB_DEV_HOST,
            DIALECT: envVars.DB_DEV_DIALECT,
            LOGGING: envVars.DB_DEV_LOGGING,
        },
        [PRODUCTION]: {
            USERNAME: envVars.DB_PROD_USERNAME,
            PASSWORD: envVars.DB_PROD_PASSWORD,
            DATABASE: envVars.DB_PROD_DATABASE,
            HOST: envVars.DB_PROD_HOST,
            DIALECT: envVars.DB_PROD_DIALECT,
            LOGGING: envVars.DB_PROD_LOGGING,
        },
        [TEST]: {
            USERNAME: envVars.DB_TEST_USERNAME,
            PASSWORD: envVars.DB_TEST_PASSWORD,
            DATABASE: envVars.DB_TEST_DATABASE,
            HOST: envVars.DB_TEST_HOST,
            DIALECT: envVars.DB_TEST_DIALECT,
            LOGGING: envVars.DB_TEST_LOGGING,
        },
    },
}

module.exports = envConfig
