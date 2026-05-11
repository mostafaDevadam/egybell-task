const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserService } = require("../services/user.service");
const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { LogService } = require("../services/log.service");

const router = express.Router();


// ✅ Admin → get all users
router.get("/", auth, role(["admin"]), (req, res) => {
    res.json({ statusCode: 200, message: "All users", data: UserService.getAllUsers() });
});

// ✅ User → get own data by ID
router.get("/:id", auth, (req, res) => {
    const userId = parseInt(req.params.id);

    // user can only access himself
    if (req.user.role === "user" && req.user.id !== userId) {
        return res.status(403).json({ message: "Access denied" });
    }

    //const user = users.find(u => u.id === userId);
    const user = UserService.getUserById(userId)
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ statusCode: 200, message: "User details", data: user });
});


router.patch("/:id", auth, (req, res) => {
    const userId = parseInt(req.params.id);

    // user can only access himself
    if (userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ statusCode: 403, message: "Access denied" });
    }

    //const user = users.find(u => u.id === userId);
    const user = UserService.getUserById(userId)
    if (!user) return res.status(404).json({ statusCode: 404, message: "User not found" });

    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;

    //const updated = users.map((m) => m.id === userId && (m = user));
    //console.log("updated:", updated)
    const updated = UserService.updateUser(userId)

    if (req.body.role) {
        LogService.create({
            user_id: user.id,
            action: "changed role to " + req.body.role
        });
    }



    res.json({ statusCode: 200, message: "Updated User", data: updated });
});


// delete: if role is admin then delete user
// delete: if role is user and param id is equal to current user id then delete own account: 
router.delete("/:id", auth, (req, res) => {
    const userId = parseInt(req.params.id);

    // user can only access himself
    if (userId !== req.user.id && req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }

    //const user = users.find(u => u.id === userId);
    const user = UserService.getUserById(userId)
    if (!user) return res.status(404).json({ statusCode: 404, message: "User not found" });

    let isDeleted = false;
    let deletedUser = null;
    if (userId === req.user.id) {
        deletedUser = UserService.deleteUserById(userId)
        isDeleted = true
    }

    if (req.user.role === "admin") {
        deletedUser = UserService.deleteUserById(userId)
        isDeleted = true
    }

    console.log("deletedUser:", deletedUser)

    isDeleted ? res.json({ statusCode: 200, message: "Deleted User successfully", data: deletedUser }) : res.status(409).json({ statusCode: 500, message: "Delete user failed" });

})



module.exports = router;