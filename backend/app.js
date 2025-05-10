const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();
const plateRoutes = require("./Routes/plate"); // ✅ Added plate routes
const userRoutes = require("./Routes/user"); // ✅ Added user route

// Middleware
app.use(express.json());
app.use(cors());



// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB Error: ", err));
  

// Routes
app.use("/api/user", userRoutes); // ✅ Added user route
 app.use("/api/plate", require("./Routes/plate")); // ✅ Added plate routes
app.use("/api/plates", plateRoutes);
app.use("/api/auth", require("./Routes/auth")); // ✅ Added auth route


const port = 5000;


// Make server accessible from other devices (e.g., ESP32)
app.listen(5000, '0.0.0.0', () => {
  console.log(`Server running on http://192.168.1.79:5000`);
});