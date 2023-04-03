const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Authenticate a user
exports.login = async (req, res) => {
  console.log("inside");
  console.log(req.body);
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error("Invalid login credentials");
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error("Invalid login credentials");
    }
    // Generate JWT
    const token = jwt.sign({ id: user._id }, "secret key", {
      expiresIn: "100d",
    });
    res.cookie("jwt", token, { httpOnly: true });
    const returnUser = { ...user };
    delete returnUser[password];
    user.password = undefined;
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Logout user
exports.logout = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    await user.save();
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
