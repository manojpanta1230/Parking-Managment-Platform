const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5 min" });
};

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"ParkSmart" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code for Verification",
    html: `
      <div style="font-family: Arial; padding: 20px; border: 1px solid #eee;">
        <h2>Welcome to ParkSmart!</h2>
        <p>Your OTP is: <strong style="color:#4f46e5;">${otp}</strong></p>
        <p>This code will expire in 5 minutes.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// ✅ REGISTER controller
const register = async (req, res) => {
  const { firstName, lastName, email, phone_no, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists: Please Login" });
    }

    const otp = generateOTP();
    const otpExpires = Date.now() + 5 * 60 * 1000;

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone_no,
      password,
      role,
      otp,
      otpExpires,
      isVerified: false,
    });

    await sendOTPEmail(email, otp);

    res.status(200).json({
      message: "OTP sent to email. Please verify.",
      email: user.email,
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

//  LOGIN controller
const login = async (req, res) => {
    // Validate user credentials (email & password)
    const user = await User.findOne({ email: req.body.email });
  
    if (!user || !(await user.matchPassword(req.body.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  
    // ✅ Send back user info and token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    res.status(200).json({
      token,
      user: {
        name: user.firstName,
        role: user.role,
      },
    });
  };

// VERIFY OTP controller
const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null;

    await user.save();

    res.json({
      token: generateToken(user._id),
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: `${user.firstName} ${user.lastName}`, //  include this
      },
    });
    
  } catch (err) {
    console.error("VERIFY OTP ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS controller
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "firstName lastName email role"); // Select only needed fields
    const formatted = users.map(u => ({
      _id: u._id,
      name: `${u.firstName} ${u.lastName}`,
      email: u.email,
      role: u.role
    }));
    res.status(200).json(formatted);
  } catch (err) {
    console.error("GET USERS ERROR:", err.message);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};


//  Export all controllers
module.exports = {
  register,
  login,
  verifyOTP,
  getAllUsers,
 
};
