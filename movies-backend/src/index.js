// src/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const seedAdmin = require("./config/seedAdmin");
const screenRoutes = require("./routes/screenRoutes");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health route
app.get("/", (req, res) => {
  res.json({ message: "Movie Booking API is running 🚀" });
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/screens", screenRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

connectDB()
  .then(async () => {
    console.log("⭐ MongoDB connected");
    await seedAdmin();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
  });
