/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMoviesByGenres, getTVDetails, getTVCredits } from "../services/api";
import type { CastMember, CrewMember, TV } from "../types/interfaces";
import { Link } from "react-router-dom";

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
            {tvDetails.number_of_seasons}Seasons
          </p>
          <p>{tvDetails.genres.map((genre) => genre.name).join(" ")}</p>
          <p>{tvDetails.overview}</p>
        </div>
      </div>

      <div>
        <h2>CAST</h2>
        <div>
          {cast.map((actor, index) => (
            <div key={`${actor.id}-${index}`}>
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div> NO IMAGE </div> // colocar aqui uma imagem vazia
              )}
              <p>{actor.name}</p>
              <p>{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2>CREW</h2>
        {crew && crew.length > 0 ? (
          <div>
            {crew.map((member, index) => (
              <div key={`${member.id}-${index}`}>
                <p>{member.name}</p>
                <p>{member.job}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No crew information for this</p>
        )}
      </div>

      <div>
        <h2>MORE LIKE THIS</h2>
        <div>
          {relatedTVShows.length > 0 ? (
            relatedTVShows.map((tv) => (
              <Link to={`/movie/${tv.id}`} key={tv.id}>
                {tv.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`}
                    alt={tv.name}
                  />
                ) : (
                  <div>NO IMAGE</div>
                )}
              </Link>
            ))
          ) : (
            <p>No Related Tv shows Found</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default TvDetails;
