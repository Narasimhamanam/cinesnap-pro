// src/pages/TicketDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import api from "../api/axiosInstance";

// language code -> label
const LANG_MAP = {
  EN: "English",
  HI: "Hindi",
  TE: "Telugu",
  TA: "Tamil",
  KN: "Kannada",
  ML: "Malayalam",
  MR: "Marathi",
  BN: "Bengali",
  GU: "Gujarati",
};

// convert row number -> A, B, C… AA, AB, etc.
const rowNumberToLetters = (rowNumber) => {
  let n = Number(rowNumber);
  if (!n || n < 1) return "?";
  let result = "";
  while (n > 0) {
    n--; // 1 -> 0
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26);
  }
  return result;
};

const formatSeatLabel = (row, col) =>
  `${rowNumberToLetters(row)}-${col}`;

const TicketDetail = () => {
  const { id: bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/bookings/${bookingId}`);
        setBooking(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load ticket details");
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const handlePrint = () => {
    window.print(); // browser -> Save as PDF
  };

  if (loading) return <p className="page-subtitle">Loading ticket...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!booking) return <p className="error-text">Ticket not found.</p>;

  const show = booking.showId;
  const movie = show?.movieId;
  const screen = show?.screenId;

  // ---------- date & time: "Dec 5 • 08:30 PM" ----------
  const showDate = new Date(show.startTime);
  const showDayMonth = showDate.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  }); // Dec 5
  const showTime = showDate.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  }); // 08:30 PM
  const showDisplay = `${showDayMonth} • ${showTime}`;

  const bookingDate = new Date(booking.createdAt).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  // ---------- price breakdown ----------
  const seatCount = booking.seats.length;
  const baseTicketAmount =
    show?.basePrice && seatCount
      ? show.basePrice * seatCount
      : booking.totalAmount;
  let convenienceFee = booking.totalAmount - baseTicketAmount;
  if (convenienceFee < 0) convenienceFee = 0;
  const discount = 0;
  const totalAmount = baseTicketAmount + convenienceFee - discount;

  // ---------- seats as A-5, A-6 ----------
  const seatString = booking.seats
    .map((s) => formatSeatLabel(s.row, s.col))
    .join(", ");

  // ---------- QR payload ----------
  const qrValue =
    booking.qrCodeData ||
    JSON.stringify({
      bookingId: booking._id,
      showId: show._id,
      userId: booking.userId,
      seats: booking.seats,
    });

  const languageLabel =
    LANG_MAP[movie?.language] || movie?.language || "Language";

  return (
    <div className="ticket-screen">
      <div className="ticket-bms-card">
        {/* TOP WHITE PART */}
        <div className="ticket-bms-top">
          {movie?.posterUrl && (
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="ticket-bms-poster"
            />
          )}

          <div className="ticket-bms-top-info">
            <h2 className="ticket-bms-title">
              {movie?.title || "Movie Title"}
            </h2>

            <p className="ticket-bms-meta">
              {languageLabel}
              {screen?.name ? `, ${screen.name}` : ""}
            </p>

            <p className="ticket-bms-meta">{showDisplay}</p>

            <p className="ticket-bms-meta">Seats: {seatString}</p>

            <p className="ticket-bms-meta">
              CineSnap Multiplex • Booking ID: {booking._id}
            </p>
          </div>

          <div className="ticket-bms-side-label">M-Ticket</div>
        </div>

        {/* PERFORATED DIVIDER */}
        <div className="ticket-bms-divider">
          <div className="ticket-bms-cut-left" />
          <div className="ticket-bms-dash" />
          <div className="ticket-bms-cut-right" />
        </div>

        {/* BOTTOM GREY PART */}
        <div className="ticket-bms-bottom">
          <div className="ticket-bms-row ticket-bms-row-total">
            <span>Total Amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
          <div className="ticket-bms-row">
            <span>Ticket price ({seatCount})</span>
            <span>₹{baseTicketAmount.toFixed(2)}</span>
          </div>
          <div className="ticket-bms-row">
            <span>Convenience fees</span>
            <span>₹{convenienceFee.toFixed(2)}</span>
          </div>
          <div className="ticket-bms-row">
            <span>Discount</span>
            <span>- ₹{discount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* QR CODE BELOW TICKET */}
      <div className="ticket-bms-qr-wrapper">
        <div className="ticket-bms-qr-card">
          <QRCode value={qrValue} size={120} bgColor="#ffffff" fgColor="#111827" />
        </div>
        <p className="ticket-bms-qr-text">
          Scan this QR at entry. Booked on {bookingDate}.
        </p>
      </div>

      <button className="btn ticket-bms-download" onClick={handlePrint}>
        Download / Print Ticket
      </button>
    </div>
  );
};

export default TicketDetail;
