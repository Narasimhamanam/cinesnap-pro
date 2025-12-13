import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const ShowSelection = () => {
  const { id: movieId } = useParams();
  const [shows, setShows] = useState([]);
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  const fetchShows = async () => {
    const params = { movieId };
    if (city) params.city = city;
    const res = await api.get("/shows", { params });
    setShows(res.data);
  };

  useEffect(() => {
    fetchShows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchShows();
  };

  const handleSelectShow = (showId) => {
    navigate(`/shows/${showId}/seats`);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Select a showtime</h1>
        <p className="page-subtitle">
          Filter by city and pick the cinema & time that works for you.
        </p>
      </div>

      <form
        onSubmit={handleSearch}
        style={{ display: "flex", gap: "0.6rem", marginBottom: "1rem" }}
      >
        <input
          className="input"
          placeholder="Filter by city (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn" type="submit">
          Apply
        </button>
      </form>

      {shows.length === 0 && (
        <p style={{ color: "var(--text-muted)" }}>No shows for this movie.</p>
      )}

      <div className="show-list">
        {shows.map((show) => (
          <div key={show._id} className="show-card">
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                {show.screenId?.cinemaName} • {show.screenId?.city}
              </div>
              <div className="show-text">
                Screen {show.screenId?.name} •{" "}
                {new Date(show.startTime).toLocaleString()}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div className="show-text">From ₹{show.basePrice}</div>
              <button
                className="btn"
                style={{ marginTop: "0.3rem" }}
                onClick={() => handleSelectShow(show._id)}
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowSelection;
