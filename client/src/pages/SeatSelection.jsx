import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import api from "../api/axiosInstance";
import { useAuth } from "../context/AuthContext";
import SeatGrid from "../components/SeatGrid";

const SeatSelection = () => {
  const { id: showId } = useParams();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [layout, setLayout] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showInfo, setShowInfo] = useState(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");

  // fetch layout + show info
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");

        const [layoutRes, showRes] = await Promise.all([
          api.get(`/shows/${showId}/seats`),
          api.get(`/shows`, { params: { movieId: undefined } }), // get all shows
        ]);

        setLayout(layoutRes.data);

        const found = (showRes.data || []).find((s) => s._id === showId);
        if (found) setShowInfo(found);
      } catch (err) {
        console.error(err);
        setError("Failed to load seat layout. Please try again.");
      }
    };

    fetchData();
  }, [showId]);

  const handleToggleSeat = (row, col) => {
    const exists = selectedSeats.some((s) => s.row === row && s.col === col);
    if (exists) {
      setSelectedSeats((prev) =>
        prev.filter((s) => !(s.row === row && s.col === col))
      );
    } else {
      setSelectedSeats((prev) => [...prev, { row, col }]);
    }
  };

  const handleConfirm = async () => {
    setError("");

    if (!isAuthenticated) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    if (selectedSeats.length === 0) {
      setError("Select at least one seat");
      return;
    }

    if (!paymentMethod) {
      setError("Choose a payment method");
      return;
    }

    try {
      setSaving(true);

      // In real life, you’d integrate Razorpay / Stripe here.
      // For now we simulate payment success + create booking.
      const res = await api.post("/bookings", {
        showId,
        seats: selectedSeats,
        paymentMethod, // just stored as info
      });

      // Navigate to ticket page
      navigate(`/bookings/${res.data._id}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Booking / payment failed");
    } finally {
      setSaving(false);
    }
  };

  if (!layout) {
    return <p className="page-subtitle">Loading seat layout...</p>;
  }

  const totalPrice =
    (showInfo?.basePrice || 0) * (selectedSeats.length || 0);

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: "1rem" }}>
        <h1 className="page-title">Seat Selection</h1>
        {showInfo && (
          <p className="page-subtitle">
            {showInfo.movieId?.title} • {showInfo.screenId?.name} •{" "}
            {new Date(showInfo.startTime).toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        )}
      </div>

      {error && <p className="error-text">{error}</p>}

      <SeatGrid
        totalRows={layout.totalRows}
        seatsPerRow={layout.seatsPerRow}
        bookedSeats={layout.bookedSeats || []}
        selectedSeats={selectedSeats}
        onToggle={handleToggleSeat}
      />

      <div
        style={{
          marginTop: "1.5rem",
          padding: "1rem 1.25rem",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <h3 style={{ marginBottom: "0.75rem", fontSize: "1rem" }}>
          Review & Payment
        </h3>
        <p style={{ fontSize: "0.9rem", marginBottom: "0.25rem" }}>
          Selected Seats: {selectedSeats.length}
        </p>
        <p style={{ fontSize: "0.9rem", marginBottom: "0.75rem" }}>
          Total Amount: <b>₹{totalPrice}</b>
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          {["UPI", "Card", "NetBanking"].map((m) => (
            <button
              key={m}
              type="button"
              className={
                "btn btn-sm" +
                (paymentMethod === m ? " btn-outline-active" : " btn-outline")
              }
              onClick={() => setPaymentMethod(m)}
            >
              {m}
            </button>
          ))}
        </div>

        <button
          className="btn"
          onClick={handleConfirm}
          disabled={saving || !selectedSeats.length}
        >
          {saving ? "Processing payment..." : "Pay & Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default SeatSelection;
