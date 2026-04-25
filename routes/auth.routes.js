const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../models/user.model");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { logs } = require("../models/log.model");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password, role: userRole } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) return res.status(404).json({ statusCode: 500, message: "Email is already exiting", data: null });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role: userRole || "user",
  };

  users.push(user);

  console.log("users:", users)

  res.json({ statusCode: 201, message: "User created/registered", data: user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({ statusCode: 404, message: "User not found", data: null });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ statusCode: 400, message: "Wrong password", data: null });

  

  console.log("user:", user)

  logs.push({
    id: logs.length + 1,
    user_id: user.id,
    action: "login",
    timestamp: new Date().toISOString(),
  });

  const obj = {
    id: user.id,
    access_token: generateAccessToken(user),
    refresh_token: generateRereshToken(user),
    role: user.role,
  }

  res.json({ statusCode: 201, message: "Login successful", data: obj});
});


router.post("/logout/:id", auth, async (req, res) => {

  const userId = parseInt(req.params.id);

  // user can only access himself
  if (req.user.id !== userId) {
    return res.status(403).json({ message: "Access denied" });
  }

  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ message: "User not found" });


  logs.push({
    id: logs.length + 1,
    user_id: user.id,
    action: "logout",
    timestamp: new Date().toISOString(),
  });

  res.json({ statusCode: 201, message: "Logout successful", data: null });

})

router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body
  console.log('body', req.body);

  const v = verifyRefreshToken(refresh_token);
  const user = users.find(u => u.id === v.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  const re = generateRereshToken(user);
  const tk = generateAccessToken(user);



  res.json({
    statusCode: 201,
    message: "Refresh token successful",
    data: { access_token: tk, refresh_token: re }
  })
})

function verifyRefreshToken(refresh_token) {
  const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET)
  return decoded;
}


function generateRereshToken(user) {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_REFRESH_SECRET,
  );
  return token
}

function verifyAccessToken(refresh_token) {
  const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET)
  return decoded;
}


function generateAccessToken(user) {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.EXPRIES_IN }
  );
  return token
}

module.exports = router;