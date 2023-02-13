const router = require("express").Router()

const { userController: controller } = require("../controllers")
const { userValidator: validator } = require("../validators")
const validate = require("../middlewares/validate")
const auth = require("../middlewares/auth")
const { GET_USERS, MANAGE_USERS } = require("../utils").commonConstants.rights

router
    .route("/")
    .get((req, res) => res.send("Get current user profile"))
    .patch((req, res) => res.send("Update profile info"))

router.get("/like-books", (req, res) => res.send("Get liked books"))

router
    .route("/like-books/:bookId")
    .put((req, res) => res.send("Like a book"))
    .delete((req, res) => res.send("Unlike a book"))

module.exports = router
