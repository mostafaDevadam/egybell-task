const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { addUser, getUserByEmail, getUserById } = require("../models/user.model");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { logs } = require("../models/log.model");
const { SocketService } = require("../services/socket.service");
const { NotificationsService } = require("../services/notifications.service");

const router = express.Router();



// Register
router.post("/register", async (req, res) => {
  const { email, password, role: userRole } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ statusCode: 400, message: "Email, password and role are required", data: null });
  }

  //const existing = users.find(u => u.email === email);
  const existing = getUserByEmail(email)
  if (existing) return res.status(422).json({ statusCode: 422, message: "Email is already exiting", data: null });

  const hashedPassword = await bcrypt.hash(password, 10);

  /*const user = {
    id: users.length + 1,
    email,
    password: hashedPassword,
    role: userRole || "user",
  };

  users.push(user);*/
  const user = addUser(email, userRole || "user", hashedPassword)

  console.log("user:", user)

  if (!user) return res.status(500).json({ statusCode: 500, message: "Cannot register user", data: null });

  // send notification: new user is registered
  //SocketService.sendNotification({ msg: "register is successfully", date: new Date(), state: "register", data: user });
  //SocketService.sendNotification({ statusCode: 201, message: "register successful", data: {type: 'success', date: new Date(), state: "register", user} });
  const userObj = { id: user.id, email: user.email, role: user.role }
  const notify = NotificationsService.addNotification({ type: 'success', date: new Date(), message: "User created or registered successfully", state: "register", user: userObj })
  SocketService.sendNotification(notify);
  SocketService.sendAllNotifications(NotificationsService.findAll());

  res.json({ statusCode: 201, message: "User created or registered successfully", message_ar: "تم إنشاء المستخدم أو تسجيله بنجاح", data: user });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // const user = users.find(u => u.email === email);
  const user = getUserByEmail(email)
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

  // send notification: user is logged-in
  //SocketService.sendNotification({ statusCode: 201, message: "Login successful", data: {type: 'success', date: new Date(), state: "logged-in",user} });
  const userObj = { id: user.id, email: user.email, role: user.role }
  const notify = NotificationsService.addNotification({ type: 'success', date: new Date(), message: "User logged-in successfully", state: "login", user: userObj })
  SocketService.sendNotification(notify);
  SocketService.sendAllNotifications(NotificationsService.findAll());


  res.json({ statusCode: 201, message: "Login successful", message_ar: "تم تسجيل الدخول بنجاح", data: obj });
});

router.post("/refresh", async (req, res) => {
  const { refresh_token } = req.body
  console.log('body', req.body);

  const v = verifyRefreshToken(refresh_token);
  // const user = users.find(u => u.id === v.id);
  const user = getUserById(v.id)
  if (!user) return res.status(404).json({ statusCode: 404, message: "User not found" });
  const re = generateRereshToken(user);
  const tk = generateAccessToken(user);



  res.json({
    statusCode: 201,
    message: "Refresh token successful",
    data: { access_token: tk, refresh_token: re }
  })
})


router.post("/logout/:id", auth, async (req, res) => {

  const userId = parseInt(req.params.id);

  // user can only access himself
  if (req.user.id !== userId) {
    return res.status(403).json({ message: "Access denied" });
  }

  //const user = users.find(u => u.id === userId);
  const user = getUserById(userId)
  if (!user) return res.status(404).json({ message: "User not found" });


  logs.push({
    id: logs.length + 1,
    user_id: user.id,
    action: "logout",
    timestamp: new Date().toISOString(),
  });

  res.json({ statusCode: 201, message: "Logout successful", data: null });

})

router.get("/me", auth, (req, res) => {

  console.log("me")

  if (!req.user) {
    return res.status(401).json({ statusCode: 401, message: "Unauthorized", data: null });
  }

  console.log("req user:", req.user)

  const user = getUserById(req.user.id)
  if (!user) return res.status(404).json({ statusCode: 404, message: "User not found" });

  console.log("user:", user)


  res.json({ statusCode: 200, message: "Get Current User", data: user });
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

function verifyAccessToken(access_token) {
  const decoded = jwt.verify(access_token, process.env.JWT_SECRET)
  return decoded;
}


function generateAccessToken(user) {
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: 30 }
  );
  return token
}

module.exports.AuthService = {
  verifyRefreshToken,
  generateRereshToken,
  verifyAccessToken,
  generateAccessToken
}

module.exports = router;