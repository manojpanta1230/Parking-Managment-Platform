const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../Controllers/userControllers");

const {
  register,
  login,
} = require("../Controllers/userControllers");

const { authenticateToken } = require("../Authentication/auth");

// ✅ Public routes
router.post("/register", register);
router.post("/login", login);



router.get("/allusers",getAllUsers);


module.exports = router;
