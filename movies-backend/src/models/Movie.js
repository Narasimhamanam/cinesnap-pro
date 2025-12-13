// src/models/Movie.js
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    durationMins: Number,
    genre: [String],
    language: String,
    rating: String, // "U", "U/A", "A", etc.
    posterUrl: String,
    trailerUrl: String,
    releaseDate: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
