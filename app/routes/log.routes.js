const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { LogService } = require("../services/log.service");
const { UserService } = require("../services/user.service");
const express = require("express");
const router = express.Router();

router.get("/", auth, role(["admin"]), (req, res) => {
     /*if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }*/
    res.json({ statusCode: 200, message: "All logs", data: LogService.findAllWithUsers() });
});

module.exports = router;