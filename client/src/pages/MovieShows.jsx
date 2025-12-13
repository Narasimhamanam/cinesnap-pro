import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosInstance";

const MovieShows = () => {
  const { id: movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("MovieShows mounted for movieId:", movieId);

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const [movieRes, showsRes] = await Promise.all([
          api.get(`/movies/${movieId}`).catch(() => ({ data: null })), // in case /:id not implemented
          api.get("/shows", { params: { movieId } }),
        ]);

        if (movieRes.data && !movieRes.data.message) {
          setMovie(movieRes.data);
        }

        setShows(showsRes.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load showtimes");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [movieId]);

  const handleSelectSeats = (showId) => {
    navigate(`/shows/${showId}/seats`);
  };

  const fmt = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className="page">
      <section className="page-header">
        <h1 className="page-title">
          {movie?.title || "Showtimes"}
        </h1>
        <p className="page-subtitle">
          Choose a showtime and book your seats.
        </p>
      </section>

      {loading && (
        <p style={{ color: "var(--text-muted)" }}>Loading showtimes...</p>
      )}

      {error && <p className="error-text">{error}</p>}

      {!loading && !error && shows.length === 0 && (
        <p style={{ color: "var(--text-muted)" }}>
          No showtimes available for this movie yet. Check again later.
        </p>
      )}

      {!loading && shows.length > 0 && (
        <div className="movie-grid" style={{ marginTop: "0.75rem" }}>
          {shows.map((s) => (
            <div key={s._id} className="movie-card">
              <div className="movie-card-body">
                <div className="movie-title">
                  {s.screenId?.name || "Screen"}
                </div>
                <div className="movie-meta">
                  {fmt(s.startTime)} • ₹{s.basePrice}
                </div>
                <button
                  className="btn btn-sm"
                  onClick={() => handleSelectSeats(s._id)}
                >
                  Select seats
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieShows;
