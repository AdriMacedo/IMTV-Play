import { Link } from "react-router-dom";
import type { Movie } from "../../types/interfaces";
import { poster } from "../../utils/imagePath";
import StarRating from "../StarRating/StarRating";
import "../../assets/styles/_common.scss";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link
      to={`/movie/${movie.id}`}
      aria-label={`View details for ${movie.title}`}
    >
      <div key={movie.id} className="card">
        <img src={`${poster}${movie.poster_path || ""}`} alt={movie.title} />
        <h3 className="card-title">{movie.title}</h3>
        <div className="footer-items">
          <p className="release-date">{movie.release_date.slice(0, 4)}</p>
          <StarRating voteAverage={movie.vote_average} />
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
