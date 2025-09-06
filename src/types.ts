export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;  // sometimes poster can be null
  overview: string;
  release_date: string;
  vote_average: number;
}