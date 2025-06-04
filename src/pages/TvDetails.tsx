/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTVByGenres,
  getTVDetails,
  getTVCredits,
  getTVImages,
} from "../services/api";
import type {
  CastMember,
  CrewMember,
  Genre,
  MediaImages,
  TV,
} from "../types/interfaces";
import CastList from "../components/Details/CastList";
import CrewList from "../components/Details/CrewList";
import SimilarList from "../components/Details/SimilarList";
import Overview from "../components/Details/Overview";
import { originalImage, poster } from "../utils/imagePath";
import Spinner from "../components/Spinner/Spinner";

function TvDetails() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const [tvDetails, setTvDetails] = useState<TV | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedTVShows, setRelatedTVShows] = useState<TV[]>([]);
  const [tvImages, setTvImages] = useState<MediaImages | null>(null);

  useEffect(() => {
    const fetchTvDetails = async () => {
      if (!id) {
        console.log("Id nao encontrado");
        return;
      }
      try {
        const details = await getTVDetails(id);
        const credits = await getTVCredits(id);
        const images = await getTVImages(id);

        setTvDetails(details);
        setCast(credits.cast);
        setCrew(credits.crew);
        setTvImages(images);

        const genreIds = details.genres.map((genre: Genre) => genre.id);
        if (genreIds.length > 0) {
          const related = await getTVByGenres(genreIds);
          setRelatedTVShows(related.results);
        }
      } catch (error) {
        console.log("Erro ao carregar detalhes das series", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTvDetails();
  }, [id]);

  if (!tvDetails) return <p>Tv show not found.</p>;

  const firstAirDate = (date: string) => date.slice(0, 4);

  const voteAverage = (voteAverage: number) => {
    if (!voteAverage) return "⭐ 0/10";
    return `⭐ ${voteAverage.toFixed(1)}/10`;
  };

  const backdropImage = tvImages?.backdrops.find((image) => image.file_path);
  const posterImage = tvImages?.posters.find((image) => image.file_path);

  const backdropURL = tvDetails?.backdrop_path
    ? `${originalImage}${tvDetails.backdrop_path}`
    : backdropImage
    ? `${originalImage}${backdropImage.file_path}`
    : null;

  const posterURL = tvDetails?.poster_path
    ? `${poster}${tvDetails.poster_path}`
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
              <img src={posterURL || ""} alt={tvDetails.name} />
            </div>
            <div className="media-info">
              <h1>{tvDetails.name}</h1>
              <div className="details">
                <p className="rating">{voteAverage(tvDetails.vote_average)}</p>
                <p>{firstAirDate(tvDetails.first_air_date)} </p>
                <p>{tvDetails.number_of_seasons} Seasons</p>
              </div>
              <div className="media-genres">
                {tvDetails.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="media-content">
        <Overview overview={tvDetails.overview} />
        <CastList cast={cast} />
        <CrewList crew={crew} />
        <SimilarList items={relatedTVShows} type={"tv"} />
      </div>
    </div>
  );
}
export default TvDetails;
