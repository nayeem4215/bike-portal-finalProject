const express = require("express");
const authController = require("../controllers/authController");

const authRouter = express.Router();

// Register a new user
authRouter.post("/register", authController.register);

// Authenticate a user
authRouter.post("/login", authController.login);

// Logout user
authRouter.post("/logout", authController.logout);

module.exports = authRouter;
