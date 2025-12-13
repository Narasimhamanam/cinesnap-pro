// src/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    showId: { type: mongoose.Schema.Types.ObjectId, ref: "Show", required: true },
    seats: [
      {
        row: Number,
        col: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "CANCELLED"],
      default: "CONFIRMED",
    },
    paymentMode: {
      type: String,
      enum: ["MOCK", "CASH", "ONLINE"],
      default: "MOCK",
    },
    qrCodeData: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
