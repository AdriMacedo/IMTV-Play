/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenres, getTVDetails, getTVCredits } from "../services/api";
import type { CastMember, CrewMember, TV } from "../types/interfaces";
import CastList from "../components/Details/CastList";
import CrewList from "../components/Details/CrewList";
import SimilarList from "../components/Details/SimilarList";
import Overview from "../components/Details/Overview";

function TvDetails() {
  const { id } = useParams<{ id: string }>();
  const [tvDetails, setTvDetails] = useState<TV | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [crew, setCrew] = useState<CrewMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [relatedTVShows, setRelatedTVShows] = useState<TV[]>([]);

  useEffect(() => {
    const fetchTvDetails = async () => {
      if (!id) {
        console.log("Id nao encontrado");
        return;
      }
      try {
        const details = await getTVDetails(id);
        const credits = await getTVCredits(id);

        setTvDetails(details);
        setCast(credits.cast);
        setCrew(credits.crew);

        const genreIds = details.genres.map((genre: { id: any }) => genre.id);
        if (genreIds.length > 0) {
          const related = await getMoviesByGenres(genreIds);
          setRelatedTVShows(related.results);
        }
      } catch (error) {
        console.log("Erro ao carregar detalhes do filme", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTvDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!tvDetails) return <p>Tv show not found.</p>;

  const firstAirDate = (date: string) => date.slice(0, 4);

  const voteAverage = (voteAverage: number) => {
    if (!voteAverage) return "⭐ 0/10";
    return `⭐ ${voteAverage.toFixed(1)}/10`;
  };

  return (
    <div>
      {tvDetails.backdrop_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w1280${tvDetails.backdrop_path}`}
          alt={tvDetails.name}
        />
      ) : (
        <div>NO IMAGE</div>
      )}
      <div>
        {tvDetails.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${tvDetails.poster_path}`}
            alt={tvDetails.name}
          />
        ) : (
          <div>NO IMAGE</div>
        )}
        <div>
          <h1>{tvDetails.name}</h1>
          <p>{voteAverage(tvDetails.vote_average)}</p>
          <p>
            {firstAirDate(tvDetails.first_air_date)}{" "}
            {tvDetails.number_of_seasons} Seasons
          </p>
          <p>{tvDetails.genres.map((genre) => genre.name).join(" ")}</p>
        </div>
      </div>
      <div>
        <Overview overview={tvDetails.overview} />
        <CastList cast={cast} />
        <CrewList crew={crew} />
        <SimilarList items={relatedTVShows} type={"tv"} />
      </div>
    </div>
  );
}
export default TvDetails;
