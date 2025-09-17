// src/services/tmdb.ts
import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];

  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: {
      api_key: API_KEY,
      query,
    },
  });

  return response.data.results as Movie[];
}

export async function searchMoviesByKeywords(keywords: string[]): Promise<Movie[]> {
  if (keywords.length === 0) return [];

  // Run all searches in parallel
  const results = await Promise.all(
    keywords.map((keyword) => searchMovies(keyword))
  );

  // Flatten + remove duplicates
  const merged = results.flat();
  const unique = merged.filter(
    (movie, index, self) =>
      index === self.findIndex((m) => m.id === movie.id)
  );

  return unique;
}
