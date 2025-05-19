import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getMoviesByGenres,
} from "../services/api";
import type { CastMember, CrewMember, Genre, Movie } from "../types/interfaces";
import CastList from "../components/Details/CastList";
import CrewList from "../components/Details/CrewList";
import SimilarList from "../components/Details/SimilarList";
import Overview from "../components/Details/Overview";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();
  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMoviedetails = async () => {
      if (!id) {
        console.log("Id nao encontrado");
        return;
      }
      try {
        const details = await getMovieDetails(id);
        const credits = await getMovieCredits(id);

        setMovieDetails(details);
        setCast(credits.cast);
        setCrew(credits.crew);

        const genreIds = details.genres.map((genre: Genre) => genre.id);
        if (genreIds.length > 0) {
          const relatedMovies = await getMoviesByGenres(genreIds);
          setRelatedMovies(relatedMovies.results);
        }
      } catch (error) {
        console.log("Erro ao carregar detalhes do filme", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMoviedetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!movieDetails) return <p>Movie not found.</p>;

  const releaseDate = (releaseDate: string) => releaseDate.slice(0, 4);

  const runtime = (runtime: number | null) => {
    if (!runtime) return "Duration unknown";
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h${minutes}m`;
  };

  const voteAverage = (voteAverage: number) => {
    if (!voteAverage) return "⭐ 0/10";
    return `⭐ ${voteAverage.toFixed(1)}/10`;
  };

  return (
    <div>
      {movieDetails.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w1280${movieDetails.backdrop_path}`}
          alt={movieDetails.title}
        />
      ) : (
        <div>NO IMAGE</div>
      )}
      <div>
        {movieDetails.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />
        ) : (
          <div>NO IMAGE</div>
        )}
        <div>
          <h1>{movieDetails.title}</h1>
          <p>{voteAverage(movieDetails.vote_average)}</p>
          <p>{releaseDate(movieDetails.release_date)}</p>
          <p>{runtime(movieDetails.runtime)}</p>
          <p>{movieDetails.genres.map((genre) => genre.name).join(" ")}</p>
        </div>
      </div>
      <div>
        <Overview overview={movieDetails.overview} />
        <CastList cast={cast} />
        <CrewList crew={crew} />
        <SimilarList items={relatedMovies} type={"movie"} />
      </div>
    </div>
  );
}
export default MovieDetails;
