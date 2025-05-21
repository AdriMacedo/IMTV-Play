
export interface Genre {
  id: number;
  name: string;
}

export interface Media {
  id: number;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;

  genres: Genre[];
  overview: string;
}

export interface Movie extends Media{
  title: string;
  release_date: string;
  runtime: number;
}

export interface MovieList {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export interface TV extends Media {
  name: string;
  first_air_date: string;
  number_of_seasons: number;
}


export interface MovieImages {
  backdrops : {file_path: string} [];
  posters: {file_path: string} [];
}