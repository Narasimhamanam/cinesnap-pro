import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AdminShows = () => {
  const [movies, setMovies] = useState([]);
  const [screens, setScreens] = useState([]);
  const [shows, setShows] = useState([]);

  const [form, setForm] = useState({
    movieId: "",
    screenId: "",
    date: "",
    time: "",
    basePrice: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await api.get("/movies");
      setMovies(res.data || []);
    } catch (err) {
      console.error("Load movies failed", err);
    }
  };

  const fetchScreens = async () => {
    try {
      const res = await api.get("/screens");
      setScreens(res.data || []);
    } catch (err) {
      console.error("Load screens failed", err);
    }
  };

  const fetchShows = async () => {
    try {
      const res = await api.get("/shows");
      setShows(res.data || []);
    } catch (err) {
      console.error("Load shows failed", err);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchMovies();
      await fetchScreens();
      await fetchShows();
    })();
  }, []);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleCreateShow = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { movieId, screenId, date, time, basePrice } = form;
    if (!movieId || !screenId || !date || !time || !basePrice) {
      setError("All fields are required");
      return;
    }

    // Combine date + time into a JS Date
    const startTime = new Date(`${date}T${time}:00`);

    try {
      await api.post("/shows", {
        movieId,
        screenId,
        startTime,
        basePrice: Number(basePrice),
      });

      setMessage("Show created successfully ✔");
      setForm({
        movieId: "",
        screenId: "",
        date: "",
        time: "",
        basePrice: "",
      });
      fetchShows();
    } catch (err) {
      console.error("Create show failed", err);
      setError(err.response?.data?.message || "Failed to create show");
    }
  };

  const formatDateTime = (iso) => {
    if (!iso) return "-";
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Manage Showtimes</h2>
      <p className="page-subtitle">
        Link movies to screens with a date, time and ticket price.
      </p>

      <form className="form" onSubmit={handleCreateShow} style={{ marginTop: "1rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
          <select
            className="input"
            name="movieId"
            value={form.movieId}
            onChange={handleChange}
          >
            <option value="">Select movie</option>
            {movies.map((m) => (
              <option key={m._id} value={m._id}>
                {m.title}
              </option>
            ))}
          </select>

          <select
            className="input"
            name="screenId"
            value={form.screenId}
            onChange={handleChange}
          >
            <option value="">Select screen</option>
            {screens.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name} ({s.totalRows} x {s.seatsPerRow})
              </option>
            ))}
          </select>

          <input
            className="input"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <input
            className="input"
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
          />

          <input
            className="input"
            type="number"
            name="basePrice"
            placeholder="Base Price (₹)"
            value={form.basePrice}
            onChange={handleChange}
          />
        </div>

        <button className="btn" type="submit" style={{ marginTop: "0.75rem" }}>
          Create Show
        </button>
      </form>

      {message && (
        <p style={{ color: "lime", marginTop: "0.5rem", fontSize: "0.9rem" }}>
          {message}
        </p>
      )}
      {error && (
        <p style={{ color: "red", marginTop: "0.5rem", fontSize: "0.9rem" }}>
          {error}
        </p>
      )}

      {/* Shows table */}
      <h3 className="section-title" style={{ marginTop: "2rem" }}>
        All Shows
      </h3>
      {shows.length === 0 ? (
        <p style={{ color: "var(--text-muted)" }}>
          No shows created yet. Add one above.
        </p>
      ) : (
        <table className="table" style={{ marginTop: "0.75rem" }}>
          <thead>
            <tr>
              <th>Movie</th>
              <th>Screen</th>
              <th>Start Time</th>
              <th>Base Price (₹)</th>
            </tr>
          </thead>
          <tbody>
            {shows.map((s) => (
              <tr key={s._id}>
                <td>{s.movieId?.title || "-"}</td>
                <td>{s.screenId?.name || "-"}</td>
                <td>{formatDateTime(s.startTime)}</td>
                <td>{s.basePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminShows;
