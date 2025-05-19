import type { Movie } from "../../types/interfaces";
import MovieCard from "./MovieCard";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

function MovieSection({ title, movies }: MovieSectionProps) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </section>
  );
}

export default MovieSection;
