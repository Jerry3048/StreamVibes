export interface Movie {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  popularity: number;
  vote_count: number;
  backdrop_path: string | null;
  overview: string;

}

export interface Genre {
  id: number;
  name: string;
}