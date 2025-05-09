const jwt = require("jsonwebtoken");
const SECRET_KEY = "12345";

// Middleware to authenticate user using JWT
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token from header
  if (!token) {
    return res.status(401).send("Access Denied: No token provided");
  }
  try {
    const verified = jwt.verify(token, SECRET_KEY); // Verify the token
    req.user = verified; // Attach user data to the request object
    next(); // Pass control to the next middleware
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}

// Middleware to authorize based on user role
function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).send("Access Denied: Insufficient permissions");
    }
    next(); // Pass control if role matches};
  };
}
module.exports = { authenticateToken, authorizeRole };