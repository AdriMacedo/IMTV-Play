import { useEffect, useState } from "react";
import "../assets/styles/_common.scss";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpComingMovies,
} from "../services/api";
import type { Movie } from "../types/interfaces";
import MovieSection from "../components/Movie/MovieSection";

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
    return <p> Loading...</p>;
  }
  return (
    <div className="main-content">
      <MovieSection title={"POPULAR MOVIES"} movies={popularMovies} className={"grid"} />
      <MovieSection title={"TOP RATED"} movies={topRatedMovies} className={"scroll"} />
      <MovieSection title={"NOW PLAYING"} movies={nowplayingMovies} className={"scroll"} />
      <MovieSection title={"UP COMING"} movies={upcomingMovies} className={"scroll"} />
    </div>
  );
}

export default Movies;
