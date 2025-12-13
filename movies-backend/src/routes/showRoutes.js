// src/routes/showRoutes.js
const express = require("express");
const router = express.Router();
const {
  getShows,
  createShow,
  getShowSeats,
  createScreen,
} = require("../controllers/showController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// public
router.get("/", getShows);
router.get("/:id/seats", getShowSeats);

// admin
router.post("/", protect, adminOnly, createShow);
router.post("/screen", protect, adminOnly, createScreen);

module.exports = router;
