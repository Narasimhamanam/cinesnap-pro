const express = require("express");
const router = express.Router();
const { createScreen, getScreens } = require("../controllers/screenController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// admin
router.post("/", protect, adminOnly, createScreen);

// public (admin UI needs this list)
router.get("/", protect, adminOnly, getScreens);

module.exports = router;
