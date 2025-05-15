import { useEffect, useState } from "react";
import {
  getAiringTodayTV,
  getOnTheAirTV,
  getPopularTV,
  getTopRatedTV,
} from "../services/api";
import { Link } from "react-router-dom";
import type { TV } from "../types/interfaces";

function Tv() {
  const [popularTv, setPopularTv] = useState<TV[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<TV[]>([]);
  const [onTheAirTv, setOnTheAirTv] = useState<TV[]>([]);
  const [airingToday, setAiringToday] = useState<TV[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTv = async () => {
      try {
        const popular = await getPopularTV();
        const topRated = await getTopRatedTV();
        const onTheAirTv = await getOnTheAirTV();
        const airingToday = await getAiringTodayTV();

        setPopularTv(popular.results);
        setTopRatedTv(topRated.results);
        setOnTheAirTv(onTheAirTv.results);
        setAiringToday(airingToday.results);
      } catch (error) {
        console.log("Erro ao carregar tvshows:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTv();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
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
      <h2>POPULAR</h2>
      <ul>
        {popularTv.map((tv) => (
          <li key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
              {tv.poster_path && (
                <img src={getPosterUrl(tv.poster_path)} alt={tv.name} />
              )}
            </Link>
            <h3>{tv.name}</h3>
            <p>{tv.first_air_date.slice(0, 4)}</p>
            <p>{renderStars(tv.vote_average)}</p>
          </li>
        ))}
      </ul>

      <h2>TOP RATED</h2>
      <ul>
        {topRatedTv.map((tv) => (
          <li key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
              {tv.poster_path && (
                <img src={getPosterUrl(tv.poster_path)} alt={tv.name} />
              )}
            </Link>
            <h3>{tv.name}</h3>
            <p>{tv.first_air_date.slice(0, 4)}</p>
            <p>{renderStars(tv.vote_average)}</p>
          </li>
        ))}
      </ul>

      <h2>ON THE AIR</h2>
      <ul>
        {onTheAirTv.map((tv) => (
          <li key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
              {tv.poster_path && (
                <img src={getPosterUrl(tv.poster_path)} alt={tv.name} />
              )}
            </Link>
            <h3>{tv.name}</h3>
            <p>{tv.first_air_date.slice(0, 4)}</p>
            <p>{renderStars(tv.vote_average)}</p>
          </li>
        ))}
      </ul>

      <h2>AIRING TODAY</h2>
      <ul>
        {airingToday.map((tv) => (
          <li key={tv.id}>
            <Link to={`/tv/${tv.id}`}>
              {tv.poster_path && (
                <img src={getPosterUrl(tv.poster_path)} alt={tv.name} />
              )}
            </Link>
            <h3>{tv.name}</h3>
            <p>{tv.first_air_date.slice(0, 4)}</p>
            <p>{renderStars(tv.vote_average)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tv;
