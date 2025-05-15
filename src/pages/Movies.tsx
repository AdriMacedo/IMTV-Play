import { useEffect, useState } from "react";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "../services/api";
import { Link } from "react-router-dom";
import type { Movie } from "../types/interfaces";

function Movies() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowplayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const popular = await getPopularMovies();
        const topRated = await getTopRatedMovies();
        const nowPlaying = await getNowPlayingMovies();
        const upcoming = await getUpComingMovies();

        setPopularMovies(popular.results);
        setTopRatedMovies(topRated.results);
        setNowPlayingMovies(nowPlaying.results);
        setUpcomingMovies(upcoming.results);
      } catch (error) {
        console.log("Erro ao carregar filmes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <p> Carregando Filmes...</p>;
  }
  const getPosterUrl = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  };

  const renderStars = (voteAverage: number) => {
    const stars = voteAverage ? Math.round(voteAverage / 2) : 0;

    const filledStars = "★".repeat(stars);
    const emptyStars = "☆".repeat(5 - stars);

    return filledStars + emptyStars;
  };

  return (
    <div>
      <h2>POPULAR MOVIES</h2>
      <ul>
        {popularMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
              )}
            </Link>
            <h3>{movie.title}</h3>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>{renderStars(movie.vote_average)}</p>
          </li>
        ))}
      </ul>

      <h2>TOP RATED</h2>
      <ul>
        {topRatedMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
              )}
            </Link>
            <h3>{movie.title}</h3>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>{renderStars(movie.vote_average)}</p>
          </li>
        ))}
      </ul>

      <h2>NOW PLAYING</h2>
      <ul>
        {nowplayingMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
              )}
            </Link>
            <h3>{movie.title}</h3>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>{renderStars(movie.vote_average)}</p>
          </li>
        ))}
      </ul>

      <h2>UP COMING</h2>
      <ul>
        {upcomingMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <img src={getPosterUrl(movie.poster_path)} alt={movie.title} />
              )}
            </Link>
            <h3>{movie.title}</h3>
            <p>{movie.release_date.slice(0, 4)}</p>
            <p>{renderStars(movie.vote_average)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Movies;
