// src/controllers/bookingController.js
const Booking = require("../models/Booking");
const Show = require("../models/Show");

// Create new booking
exports.createBooking = async (req, res) => {
  try {
    const userId = req.user._id;
    const { showId, seats } = req.body;

    if (!showId || !seats || !seats.length) {
      return res.status(400).json({ message: "Show and seats are required" });
    }

    const show = await Show.findById(showId);
    if (!show) return res.status(404).json({ message: "Show not found" });

    const existingBookings = await Booking.find({
      showId,
      status: "CONFIRMED",
    });

    const alreadyBooked = new Set();
    existingBookings.forEach((b) => {
      b.seats.forEach((s) => alreadyBooked.add(`${s.row}-${s.col}`));
    });

    for (const s of seats) {
      if (alreadyBooked.has(`${s.row}-${s.col}`)) {
        return res
          .status(400)
          .json({ message: `Seat row ${s.row}, col ${s.col} already booked` });
      }
    }

    const totalAmount = seats.length * show.basePrice;
    const qrCodeData = `booking|show:${showId}|user:${userId}|time:${Date.now()}`;

    const booking = await Booking.create({
      userId,
      showId,
      seats,
      totalAmount,
      status: "CONFIRMED",
      paymentMode: "MOCK",
      qrCodeData,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id })
      .populate({
        path: "showId",
        populate: { path: "movieId" },
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("Get my bookings error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: "showId",
      populate: { path: "movieId" },
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (
      booking.userId.toString() !== req.user._id.toString() &&
      req.user.role !== "ADMIN"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    res.json(booking);
  } catch (err) {
    console.error("Get booking by id error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("userId")
      .populate({
        path: "showId",
        populate: { path: "movieId" },
      });

    res.json(bookings);
  } catch (err) {
    console.error("Admin get bookings error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
