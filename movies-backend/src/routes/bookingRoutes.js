// src/routes/bookingRoutes.js
const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  getBookingById,
  getAllBookings,
} = require("../controllers/bookingController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// user routes
router.post("/", protect, createBooking);
router.get("/me", protect, getMyBookings);
router.get("/:id", protect, getBookingById);

// admin
router.get("/", protect, adminOnly, getAllBookings);

module.exports = router;
