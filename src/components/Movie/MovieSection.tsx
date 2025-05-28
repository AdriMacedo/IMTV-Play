import type { Movie } from "../../types/interfaces";
import MovieCard from "./MovieCard";
import "./MovieSection.scss";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  className: "grid" | "scroll";
}

function MovieSection({ title, movies , className}: MovieSectionProps) {
  return (
    <section className="movie-section">
      <h2 className="movie-section-title">{title}</h2>
      <div className={`movie-list ${className}`}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
