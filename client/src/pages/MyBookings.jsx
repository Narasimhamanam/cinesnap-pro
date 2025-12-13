import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bookings/me");
        setBookings(res.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your tickets");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleOpenTicket = (id) => {
    navigate(`/bookings/${id}`);
  };

  const fmt = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="page-container">
      <div className="page-header" style={{ marginBottom: "1rem" }}>
        <h1 className="page-title">My Tickets</h1>
        <p className="page-subtitle">
          View and re-download all your booked tickets.
        </p>
      </div>

      {loading && (
        <p style={{ color: "var(--text-muted)" }}>Loading your bookings...</p>
      )}
      {error && <p className="error-text">{error}</p>}

      {!loading && bookings.length === 0 && !error && (
        <p style={{ color: "var(--text-muted)" }}>
          You haven&apos;t booked any tickets yet.
        </p>
      )}

      {!loading && bookings.length > 0 && (
        <table className="table" style={{ marginTop: "0.75rem" }}>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Screen</th>
              <th>Show time</th>
              <th>Seats</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.showId?.movieId?.title || "-"}</td>
                <td>{b.showId?.screenId?.name || "-"}</td>
                <td>{fmt(b.showId?.startTime)}</td>
                <td>
                  {b.seats
                    .map((s) => `R${s.row}-S${s.col}`)
                    .join(", ")}
                </td>
                <td>₹{b.totalAmount}</td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleOpenTicket(b._id)}
                  >
                    View Ticket
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBookings;
