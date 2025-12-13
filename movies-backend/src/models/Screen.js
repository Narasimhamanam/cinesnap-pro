const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    cinemaName: { type: String, default: "CineSnap" },
    totalRows: { type: Number, required: true }, // e.g., 10 rows
    seatsPerRow: { type: Number, required: true }, // e.g., 12 seats each
  },
  { timestamps: true }
);

module.exports = mongoose.model("Screen", screenSchema);
