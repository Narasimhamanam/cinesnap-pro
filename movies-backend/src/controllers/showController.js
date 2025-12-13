const Show = require("../models/Show");
const Screen = require("../models/Screen");
const Booking = require("../models/Booking");

// GET /api/shows
// List all shows with movie + screen populated
exports.getShows = async (req, res) => {
  try {
    const filter = {};
    if (req.query.movieId) {
      filter.movieId = req.query.movieId;
    }

    const shows = await Show.find(filter)
      .populate("movieId")
      .populate("screenId")
      .sort({ startTime: 1 });

    res.json(shows);
  } catch (err) {
    console.error("Get shows error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// POST /api/shows  (admin)
// body: { movieId, screenId, startTime, basePrice }
exports.createShow = async (req, res) => {
  try {
    const { movieId, screenId, startTime, basePrice } = req.body;

    if (!movieId || !screenId || !startTime || !basePrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Optionally validate screen + movie exist
    const show = await Show.create({
      movieId,
      screenId,
      startTime,
      basePrice,
    });

    res.status(201).json(show);
  } catch (err) {
    console.error("Create show error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET /api/shows/:id/seats
// Returns layout + booked seats for a show
exports.getShowSeats = async (req, res) => {
  try {
    const showId = req.params.id;

    const show = await Show.findById(showId).populate("screenId");
    if (!show) return res.status(404).json({ message: "Show not found" });

    const screen = show.screenId;
    const totalRows = screen.totalRows;
    const seatsPerRow = screen.seatsPerRow;

    const bookings = await Booking.find({
      showId,
      status: "CONFIRMED",
    });

    const bookedSeats = [];
    bookings.forEach((b) => {
      b.seats.forEach((s) => {
        bookedSeats.push({ row: s.row, col: s.col });
      });
    });

    res.json({
      totalRows,
      seatsPerRow,
      bookedSeats,
    });
  } catch (err) {
    console.error("Get show seats error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// This is only here because your showRoutes imports createScreen.
// We won’t actually use /api/shows/screen in frontend, but keep it safe.
exports.createScreen = async (req, res) => {
  try {
    const { name, totalRows, seatsPerRow, cinemaName } = req.body;

    if (!name || !totalRows || !seatsPerRow) {
      return res.status(400).json({ message: "All fields required" });
    }

    const screen = await Screen.create({
      name,
      totalRows,
      seatsPerRow,
      cinemaName: cinemaName || "CineSnap",
    });

    res.status(201).json(screen);
  } catch (err) {
    console.error("Create screen (via showController) error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
