import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      const res = await api.get(`/movies/${id}`);
      setMovie(res.data);
    };
    fetchMovie();
  }, [id]);

  if (!movie) return <p>Loading...</p>;

  const handleBook = () => navigate(`/movie/${id}/shows`);

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{movie.title}</h1>
        <p className="page-subtitle">
          Choose a showtime and reserve your seats in a few taps.
        </p>
      </div>

      <div className="detail-layout">
        {movie.posterUrl && (
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="detail-poster"
          />
        )}
        <div>
          <div className="chip-row">
            {movie.language && <span className="chip">{movie.language}</span>}
            {movie.durationMins && (
              <span className="chip">{movie.durationMins} min</span>
            )}
            {movie.rating && <span className="chip">Rated {movie.rating}</span>}
          </div>
          <p className="detail-description">{movie.description}</p>
          <button className="btn" style={{ marginTop: "1.1rem" }} onClick={handleBook}>
            Book Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
