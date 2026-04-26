const auth = require("../middleware/auth");
const role = require("../middleware/role");
const { logs } = require("../models/log.model");
const { getUserById } = require("../models/user.model");
const express = require("express");
const router = express.Router();

router.get("/", auth, role(["admin"]), (req, res) => {
     /*if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied" });
    }*/

    const ls = logs.map((l) => {
        const user = getUserById(l.user_id)
        if(!user) return false
        console.log("log user:", user)
        return { ...l, user };
    });


    res.json({ statusCode: 200, message: "All logs", data: ls });
});

module.exports = router;