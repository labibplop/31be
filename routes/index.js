const router = require("express").Router()
const UsersRouter = require("./Users")
const GameRouter = require("./Games")
const login = require("../controller/Login.controller")

router.use("/players", UsersRouter)
router.use("/game", GameRouter)

//login handler
router.use("/auth/login", login)

module.exports = router