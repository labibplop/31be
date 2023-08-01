const UserController = require("../controller/User.controller");
const authOnly = require("../middlewares/auth");
const Router = require("express").Router();

// Router.use("/", UserController.getUser);
Router.post("/", authOnly, UserController.createUser);
Router.get("/", authOnly, UserController.getUsers);
Router.get("/:id", UserController.getUserById);
Router.put("/update/:id", UserController.updateUser);
Router.delete("/:id", UserController.deleteUser);

module.exports = Router;
