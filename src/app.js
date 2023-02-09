require("express-async-errors")

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const logger = require("morgan")
const passport = require("passport")

const router = require("./routes")
const db = require("./models")
const handleNotFound = require("./middlewares/handle-not-found")
const handleException = require("./middlewares/handle-exception")
const envConfig = require("./config/env-config")
const { jwtStrategy, googlePlusTokenStrategy } = require("./middlewares/passport")

const app = express()

app.use(helmet())
app.use(
    cors({
        origin: envConfig.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    })
)

app.use(logger("dev"))

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(passport.initialize())
passport.use("jwt", jwtStrategy)
passport.use("google-plus-token", googlePlusTokenStrategy)

app.use("/api/v1/", router)

app.use(handleNotFound)
app.use(handleException)

const start = async () => {
    try {
        await db.sequelize.sync()
        app.listen(
            envConfig.PORT,
            console.log("🧙‍ Server is running on port " + envConfig.PORT)
        )
    } catch (error) {
        console.log(error)
    }
}

start()
