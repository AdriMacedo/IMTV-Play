import type { Movie } from "../../types/interfaces";
import MovieCard from "./MovieCard";
import "../../assets/styles/_common.scss";
import Spinner from "../Spinner/Spinner";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  className: "grid" | "scroll";
  loading: boolean;
}

function MovieSection({
  title,
  movies,
  className,
  loading = false,
}: MovieSectionProps) {
  return (
    <section className="media-section">
      <h2 className="media-section-title">{title}</h2>
      {loading ? (
        <Spinner />
      ) : (
        <div className={`media-list ${className}`}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MovieSection;
