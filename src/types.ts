
export type SpokenLanguage = {
  iso_639_1: string;
  english_name: string;
  name: string;
};

export type Movie = {
  id: number;
  title?: string;
  name?: string; // for TV
  tagline: string;
  overview: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  genres: Genre[];
  spoken_languages: SpokenLanguage[];
  vote_count: number;
  popularity: number;
};

export interface Genre {
  id: number;
  name: string;
}

export type CastMember = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
};

export type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
};

export type Review = {
  id: string;
  author: string;
  content: string;
};