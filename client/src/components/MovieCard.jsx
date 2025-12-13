import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleViewShowtimes = () => {
    navigate(`/movie/${movie._id}/shows`);
  };

  return (
    <div className="movie-card">
      {movie.posterUrl && (
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
      )}
      <div className="movie-card-body">
        <div className="movie-title">{movie.title}</div>
        {/* ...meta + overview... */}
        <button className="btn btn-sm" onClick={handleViewShowtimes}>
          View showtimes
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
