import { useEffect, useState } from "react";
import { searchMulti } from "../services/api";
import { useLocation } from "react-router-dom";
import MovieCard from "../components/Movie/MovieCard";
import TVCard from "../components/TV/TVCard";
import type { SearchResult, Movie, TV } from "../types/interfaces";
import Spinner from "../components/Spinner/Spinner";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
function SearchResults() {
  const query = (useQuery().get("q") || "").trim().toLowerCase();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await searchMulti(query);
        setResults(data.results);
      } catch (error) {
        console.log("Error search results: ", error);
      } finally {
        setLoading(false);
      }
    };
    if (query) fetchResults();
  }, [query]);

  const movies = results.filter(
    (item) => item.media_type === "movie"
  ) as Movie[];
  const series = results.filter((item) => item.media_type === "tv") as TV[];

  return (
    <div className="main-content">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <div className="media-section">
            <h2 className="media-section-title">Movies results: "{query}"</h2>
            <div className="media-list grid">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))
              ) : (
                <p>No Movies found</p>
              )}
            </div>
          </div>
          <div className="media-section">
            <h2 className="media-section-title">Series results: "{query}"</h2>
            <div className="media-list grid">
              {series.length > 0 ? (
                series.map((tv) => <TVCard key={tv.id} tv={tv} />)
              ) : (
                <p>No Series found</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResults;
