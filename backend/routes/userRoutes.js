const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddlewares = require("../middlewares/authMiddlewares");

// GET all users
router.get("/", userController.getUsers);

// GET a single user by ID
router.get("/:id", authMiddlewares.requireAuth, userController.getUser);

// POST a new user
router.post("/", authMiddlewares.requireAuth, userController.createUser);

// PUT update a user by ID
router.put("/:id", authMiddlewares.requireAuth, userController.updateUser);

// DELETE a user by ID
router.delete("/:id", authMiddlewares.requireAuth, userController.deleteUser);

module.exports = router;
