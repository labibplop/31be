const AuthController = require("../controller/Auth.controller");
const authOnly = require("../middlewares/auth");
const Router = require("express").Router();

Router.post("/regist", AuthController.createUser);
Router.post("/login", AuthController.login);

module.exports = Router;