/** @format */

const express = require("express");
const router = express.Router();
const { protect } = require("./middleware/authMiddleware");
const { registerUser, loginUser, getUser } = require("./userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getUser);

module.exports = router;
