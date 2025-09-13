
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
  description?: string;
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
  profile_path: string | null;
};

export type Credits = {
  cast: CastMember[];
  crew: CrewMember[];
};

export type Review = {
  id: string;          // Unique ID for the review
  author: string;      // Name of the reviewer
  content: string;     // Review text
  rating?: number;     // Optional: rating given (e.g., 1–10 or 1–5 stars)
  createdAt: string;   // Date when review was created (ISO string)
  updatedAt?: string;  // Optional: last updated date
  movieName: string;   // Name of the movie being reviewed
  author_details?: {    // Optional: additional details about the author
    name?: string;
    username: string; // Username of the reviewer on the platform// URL or path to the author's avatar image
    rating?: number | null; 
    location?: string; 
  };
};

export type Episode = {
  id: number;
  name: string;
  episode_number: number;
}

export type Season  = {
  season_number: number;
  name: string;
  episode_count: number;
  poster_path: string | null;
  episodes?: Episode[];
}

export type Show = {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  first_air_date: string;
  genres: { id: number; name: string }[];
  spoken_languages: { iso_639_1: string; english_name: string }[];
  vote_average: number;
  seasons: Season[];
}