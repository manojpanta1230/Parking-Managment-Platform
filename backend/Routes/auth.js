const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware");
const { register, login,verifyOTP,getProfile} = require("../Controllers/userControllers");

router.post("/register", register);
router.post("/login", login);
router.post("/verify-otp", verifyOTP); // ✅ This must exist!
// router.get("/me", protect, getProfile);
module.exports = router;
