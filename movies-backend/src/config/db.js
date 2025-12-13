// src/config/db.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");

// load env variables
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI is not defined in .env");
    }

    await mongoose.connect(MONGO_URI, {
      // You can add options here if needed
    });

    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // stop the app if DB connection fails
  }
};

module.exports = connectDB;
