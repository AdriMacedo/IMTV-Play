import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMovieDetails,
  getMovieCredits,
  getMoviesByGenres,
  getMovieImages,
} from "../services/api";
import {
  type CastMember,
  type CrewMember,
  type Genre,
  type Movie,
  type MediaImages,
} from "../types/interfaces";
import CastList from "../components/Details/CastList";
import CrewList from "../components/Details/CrewList";
import SimilarList from "../components/Details/SimilarList";
import Overview from "../components/Details/Overview";
import { originalImage, poster } from "../utils/imagePath";
import Spinner from "../components/Spinner/Spinner";
import "../assets/styles/_common.scss";

function MovieDetails() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const [movieDetails, setMovieDetails] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedMovies, setRelatedMovies] = useState<Movie[]>([]);
  const [movieImages, setMovieImages] = useState<MediaImages | null>(null);

  useEffect(() => {
    const fetchMoviedetails = async () => {
      if (!id) {
        console.log("Id nao encontrado");
        return;
      }
      try {
        const details = await getMovieDetails(id);
        const credits = await getMovieCredits(id);
        const images = await getMovieImages(id);

        setMovieDetails(details);
        setCast(credits.cast);
        setCrew(credits.crew);
        setMovieImages(images);

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

  const backdropImage = movieImages?.backdrops.find((image) => image.file_path);
  const posterImage = movieImages?.posters.find((image) => image.file_path);

  const backdropURL = movieDetails?.backdrop_path
    ? `${originalImage}${movieDetails.backdrop_path}`
    : backdropImage
    ? `${originalImage}${backdropImage.file_path}`
    : null;

  const posterURL = movieDetails?.poster_path
    ? `${poster}${movieDetails.poster_path}`
    : posterImage
    ? `${poster}${posterImage.file_path}`
    : null;

  return (
    <div className="media-details">
      {loading ? (
        <Spinner />
      ) : (
        <div
          className="media-hero"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8)), url(${backdropURL})`,
          }}
        >
          <div className="hero-content">
            <div className="media-poster">
              <img src={posterURL || ""} alt={movieDetails.title} />
            </div>
            <div className="media-info">
              <h1>{movieDetails.title}</h1>
              <div className="details">
                <p className="rating">
                  {voteAverage(movieDetails.vote_average)}
                </p>
                <p>{releaseDate(movieDetails.release_date)}</p>
                <p>{runtime(movieDetails.runtime)}</p>
              </div>
              <div className="media-genres">
                {movieDetails.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="media-content">
        <Overview overview={movieDetails.overview} />
        <CastList cast={cast} />
        <CrewList crew={crew} />
        <SimilarList items={relatedMovies} type={"movie"} />
      </div>
    </div>
  );
}
export default MovieDetails;
