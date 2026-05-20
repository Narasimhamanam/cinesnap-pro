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

// admin — must be BEFORE /:id so it isn't swallowed by the param route
router.get("/", protect, adminOnly, getAllBookings);

// user routes
router.post("/", protect, createBooking);
router.get("/me", protect, getMyBookings);
router.get("/:id", protect, getBookingById);

module.exports = router;

