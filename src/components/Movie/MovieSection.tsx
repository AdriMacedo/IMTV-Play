import type { Movie } from "../../types/interfaces";
import MovieCard from "./MovieCard";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  className: "grid" | "scroll";
}

function MovieSection({ title, movies , className}: MovieSectionProps) {
  return (
    <section className="">
      <h2>{title}</h2>
      <div className={className}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieSection;
