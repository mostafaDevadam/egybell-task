const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../models/user.model");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { email, password, role: userRole } = req.body;

  const existing = users.find(u => u.email === email);
  if (existing) return res.status(404).json({statusCode: 500, message: "Email is already exiting", data: null });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role: userRole || "user",
  };

  users.push(user);

  console.log("users:", users)

  res.json({ statusCode: 201, message: "User created", data: user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(404).json({statusCode: 404, message: "User not found", data: null });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({statusCode: 400, message: "Wrong password", data: null });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log("user:", user)

  res.json({statusCode: 201, message: "Login successful", data: {id: user.id, role: user.role, access_token: token} });
});


module.exports = router;