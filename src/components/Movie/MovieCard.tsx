import { Link } from "react-router-dom";
import type { Movie } from "../../types/interfaces";
import { poster } from "../../utils/imagePath";

interface MovieCardProps {
  movie: Movie;
}

function MovieCard({ movie }: MovieCardProps) {
  const renderStars = (voteAverage: number) => {
    const stars = voteAverage ? Math.round(voteAverage / 2) : 0;

    const filledStars = "★".repeat(stars);
    const emptyStars = "☆".repeat(5 - stars);

    return filledStars + emptyStars;
  };
  return (
    <li key={movie.id}>
      <Link to={`/movie/${movie.id}`}>
        <img src={`${poster}${movie.poster_path || ""}`} alt={movie.title} />
        <div>
          <h3>{movie.title}</h3>
          <p>{movie.release_date.slice(0, 4)}</p>
          <p>{renderStars(movie.vote_average)}</p>
        </div>
      </Link>
    </li>
  );
}

export default MovieCard;
