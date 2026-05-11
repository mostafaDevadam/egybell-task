const jwt = require("jsonwebtoken");
const { AuthService } = require("../services/auth.service");




module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

    console.log("headers: ", req.headers)

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    //const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = AuthService.verifyAccessToken(token) //decoded; // { id, role }
    console.log("success token user:", req.user, token)
    next();
  } catch (err) {
    console.log("err:", err)
    res.status(401).json({ message: "Invalid token" });
  }
};