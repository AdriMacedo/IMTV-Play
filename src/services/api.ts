/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import type { MovieList, Movie } from "../types/interfaces";

const API_KEY = import.meta.env.VITE_REACT_APP_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_REACT_APP_TMDB_BASE_URL;

const fetchData = async (url: string, params = {}): Promise<any> => {
  try {
    const response = await axios.get(`${BASE_URL}/${url}`, {
      params: { ...params, api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    console.log("Erro ao carregar dados:", error);
    throw error;
  }
};

export const getPopularMovies = async (): Promise<MovieList> => {
  return await fetchData("movie/popular");
};

export const getNowPlayingMovies = async (): Promise<MovieList> => {
  return fetchData("movie/now_playing");
};

export const getTopRatedMovies = async (): Promise<MovieList> => {
  return fetchData("movie/top_rated");
};

export const getUpComingMovies = async (): Promise<MovieList> => {
  return fetchData("movie/upcoming");
};

export const getPopularTV = async () => {
  return fetchData("tv/popular");
};

export const getTopRatedTV = async () => {
  return fetchData("tv/top_rated");
};

export const getOnTheAirTV = async () => {
  return fetchData("tv/on_the_air");
};

export const getAiringTodayTV = async () => {
  return fetchData("tv/airing_today");
};

export const getMovieDetails = async (movieId: string): Promise<Movie> => {
  return fetchData(`movie/${movieId}`);
};

export const getTVDetails = async (tvId: string) => {
  return fetchData(`tv/${tvId}`);
};

export const getMovieCredits = async (movieId: string) => {
  return fetchData(`movie/${movieId}/credits`);
};

export const getTVCredits = async (tvId: string) => {
  return fetchData(`tv/${tvId}/credits`);
};

// export const getMovieImages = async (movieId:string) => {
//     return fetchData(`movie/${movieId}/images`);
// };

// export const getTVImages = async (tvId:string) => {
//     return fetchData(`tv/${tvId}/images`);
// };

export const getMoviesByGenres = async (genreIds: number[]) => {
  const genre = genreIds.join(" ");
  return fetchData(`discover/movie?with_genres=${genre}&language=en-US&page=1`);
};
