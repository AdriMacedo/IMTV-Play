import { Link } from "react-router-dom";
import type { Movie } from "../../types/interfaces";
import { poster } from "../../utils/imagePath";
import StarRating from "../StarRating";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  return (
    <div key={movie.id}>
      <Link to={`/movie/${movie.id}`}>
        <img src={`${poster}${movie.poster_path || ""}`} alt={movie.title} />
        <div>
          <h3>{movie.title}</h3>
          <p>{movie.release_date.slice(0, 4)}</p>
          <StarRating voteAverage={movie.vote_average} />
        </div>
      </Link>
    </div>
  );
}

export default MovieCard;
