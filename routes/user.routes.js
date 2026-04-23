const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../models/user.model");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { logs } = require("../models/log.model");

const router = express.Router();


// ✅ Admin → get all users
router.get("/", auth, role(["admin"]), (req, res) => {
    res.json({ statusCode: 200, message: "All users", data: users });
});

// ✅ User → get own data by ID
router.get("/:id", auth, (req, res) => {
    const userId = parseInt(req.params.id);

    // user can only access himself
    if (req.user.role === "user" && req.user.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
    }

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ statusCode: 200, message: "User details", data: user });
});


router.patch("/:id", auth, (req, res) => {
    const userId = parseInt(req.params.id);

    // user can only access himself
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    const updated = users.map((m) => m.id === userId && (m = user));
    console.log("updated:", updated)

    if (req.body.role) {
        logs.push({
            id: logs.length + 1,
            user_id: user.id,
            action: "changed role to " + req.body.role,
            timestamp: new Date().toISOString(),
        });
    }

    /*users = users.map((m) => {
         if (m.id === userId) {
             m = user
         }
         return m
     }
     );
 
     console.log("users:", users)*/



    res.json({ statusCode: 200, message: "Updated User", data: user });
});
module.exports = router;