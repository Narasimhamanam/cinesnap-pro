// src/index.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const movieRoutes = require("./routes/movieRoutes");
const showRoutes = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const seedAdmin = require("./config/seedAdmin");
const screenRoutes = require("./routes/screenRoutes");

const app = express();

// Middleware — must come AFTER app is created
const allowedOrigins = [
  "http://localhost:5173",
  "https://cinesnap-ticketbooking.netlify.app",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Movie Booking API is running 🚀" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/screens", screenRoutes);

const PORT = process.env.PORT || 5000;

// Start server ONCE — after DB connects
connectDB()
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedAdmin();
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ DB connection error:", err);
    process.exit(1);
  });

