require("express-async-errors")

const express = require("express")
const cors = require("cors")
const helmet = require("helmet")
const logger = require("morgan")
const passport = require("passport")
const path = require("path")

const db = require("./models")
const envConfig = require("./configs/envConfig")
const { jwtStrategy } = require("./configs/authStrategies")
const { STATIC_DIRNAME } = require("./configs/commonConstants")
const router = require("./routes")
const handleException = require("./middlewares/handleException")
const handleNotfound = require("./middlewares/handleNotfound")

const app = express()

app.use(helmet())
app.use(
    cors({
        origin: envConfig.CLIENT_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    }),
)

app.use(logger("dev"))

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(passport.initialize())
passport.use("jwt", jwtStrategy)

app.use("/api/v1/", router)

app.use(express.static(STATIC_DIRNAME))

app.use(handleNotfound)
app.use(handleException)

const start = async () => {
    try {
        await db.sequelize.sync()
        app.listen(
            envConfig.PORT,
            console.log("🧙‍ Server is running on port " + envConfig.PORT),
        )
    } catch (error) {
        console.log(error)
    }
}

start()
