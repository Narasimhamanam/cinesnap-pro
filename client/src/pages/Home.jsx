import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import MovieCard from "../components/MovieCard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const fetchMovies = async (query = "") => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/movies", {
        params: query ? { search: query } : {},
      });
      setMovies(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search.trim());
  };

  const featuredMovie = movies[0] || null;
  const otherMovies = movies.slice(1);

  const handleHeroPrimary = () => {
    if (!featuredMovie) return;
    if (isAuthenticated) {
      navigate(`/movie/${featuredMovie._id}/shows`);
    } else {
      navigate("/login", {
        state: { from: `/movie/${featuredMovie._id}/shows` },
      });
    }
  };

  const handleHeroSecondary = () => {
    if (!featuredMovie) return;
    navigate(`/movie/${featuredMovie._id}`);
  };

  const handlePosterClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="home-page">
      {/* HERO – like Netflix banner */}
      <section className="home-hero">
        <div className="home-hero-bg" />

        <div className="home-hero-inner">
          <div className="home-hero-left">
            <div className="hero-kicker">Welcome to CineSnap</div>
            <h1 className="home-hero-title">
              Book seamless movie tickets in just a few clicks.
            </h1>
            <p className="home-hero-subtitle">
              Browse movies, pick a showtime, choose your seats and get a
              digital ticket instantly. Designed to look and feel like modern
              streaming apps – perfect for a real-world college project.
            </p>

            <div className="home-hero-cta-row">
              <button className="btn" onClick={handleHeroPrimary}>
                {isAuthenticated ? "Book now" : "Get started – it’s free"}
              </button>
              <button
                className="btn-outline btn"
                type="button"
                onClick={handleHeroSecondary}
                disabled={!featuredMovie}
              >
                {featuredMovie ? "More details" : "Browse catalog"}
              </button>
            </div>

            <form className="home-hero-search" onSubmit={handleSearch}>
              <input
                className="input home-hero-search-input"
                placeholder="Search movies, actors or language..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn home-hero-search-btn" type="submit">
                Search
              </button>
            </form>
          </div>

          {/* mini featured card on the right, Netflix-style */}
          {featuredMovie && (
            <div
              className="home-hero-featured"
              onClick={() => handlePosterClick(featuredMovie._id)}
            >
              <img
                src={featuredMovie.posterUrl}
                alt={featuredMovie.title}
                className="home-hero-featured-poster"
              />
              <div className="home-hero-featured-overlay">
                <div className="home-hero-featured-tag">Featured today</div>
                <div className="home-hero-featured-title">
                  {featuredMovie.title}
                </div>
                <div className="home-hero-featured-meta">
                  {featuredMovie.language} •{" "}
                  {featuredMovie.duration
                    ? `${featuredMovie.duration} min`
                    : "2D"}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ROWS – Netflix-style carousels */}
      <section className="home-row-section">
        <div className="home-row-header">
          <h2 className="home-row-title">Now showing</h2>
        </div>

        {loading && (
          <p className="page-subtitle" style={{ marginTop: "0.5rem" }}>
            Loading movies...
          </p>
        )}
        {error && <p className="error-text">{error}</p>}

        {!loading && movies.length === 0 && (
          <p className="page-subtitle" style={{ marginTop: "0.5rem" }}>
            No movies found. Try a different search or add some from the admin
            panel.
          </p>
        )}

        {movies.length > 0 && (
          <div className="home-row-scroller">
            {movies.map((m) => (
              <div
                key={m._id}
                className="home-row-item"
                onClick={() => handlePosterClick(m._id)}
              >
                <img
                  src={m.posterUrl}
                  alt={m.title}
                  className="home-row-item-poster"
                />
                <div className="home-row-item-overlay">
                  <div className="home-row-item-title">{m.title}</div>
                  <div className="home-row-item-meta">
                    {m.language} • {m.year || "2024"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* OPTIONAL GRID – like Netflix “More like this” */}
      {otherMovies.length > 0 && (
        <section className="home-grid-section">
          <div className="home-row-header">
            <h2 className="home-row-title">All movies in CineSnap</h2>
          </div>
          <div className="movie-grid" style={{ marginTop: "0.75rem" }}>
            {movies.map((m) => (
              <MovieCard key={m._id} movie={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
