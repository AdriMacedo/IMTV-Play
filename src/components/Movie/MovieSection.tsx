import type { Movie } from "../../types/interfaces";
import MovieCard from "./MovieCard";
import "../../assets/styles/_common.scss";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  className: "grid" | "scroll";
}

function MovieSection({ title, movies , className}: MovieSectionProps) {
  return (
    <section className="media-section">
      <h2 className="media-section-title">{title}</h2>
      <div className={`media-list ${className}`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
