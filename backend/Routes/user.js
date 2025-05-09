const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Correct import for User model

const {
  register,
  login,
} = require("../Controllers/userControllers");

const { authenticateToken } = require("../Authentication/auth");



router.post("/register", register);
router.post("/login", login, authenticateToken);

module.exports = router;
