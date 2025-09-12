import { create } from "zustand";
import axios from "axios";

const API_KEY = "c83a544dff93b9547ab40c6699cf9c47";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
}

export interface TvShow {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  first_air_date: string;
  vote_average: number;
}

interface MovieStore {
  apiKey: string;
  imgBase: string;

  // Movies
  movieGenres: Genre[];
  moviesByGenre: Record<number, Movie[]>;
  fetchGenresAndMovies: () => Promise<void>;

  // TV Shows
  tvGenres: Genre[];
  tvByGenre: Record<number, TvShow[]>;
  fetchGenresAndTvShows: () => Promise<void>;

  // Trending posters
  trendingPosters: string[];
  fetchTrendingPosters: (maxImages: number) => Promise<void>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  apiKey: API_KEY,
  imgBase: IMG_BASE,

  movieGenres: [],
  moviesByGenre: {},
  tvGenres: [],
  tvByGenre: {},
  trendingPosters: [],

  // ✅ Fetch genres + 4 movies each
  fetchGenresAndMovies: async () => {
    try {
      const resGenres = await axios.get<{ genres: Genre[] }>(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
      );
      const genres = resGenres.data.genres;

      const moviesByGenre: Record<number, Movie[]> = {};
      await Promise.all(
        genres.map(async (genre) => {
          const res = await axios.get<{ results: Movie[] }>(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&page=1`
          );
          moviesByGenre[genre.id] = res.data.results
            .filter((m) => m.poster_path)
            .slice(0, 4);
        })
      );

      set({ movieGenres: genres, moviesByGenre });
    } catch (error) {
      console.error("Error fetching genres/movies:", error);
    }
  },

  // ✅ Fetch genres + 4 TV shows each
  fetchGenresAndTvShows: async () => {
    try {
      const resGenres = await axios.get<{ genres: Genre[] }>(
        `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
      );
      const genres = resGenres.data.genres;

      const tvByGenre: Record<number, TvShow[]> = {};
      await Promise.all(
        genres.map(async (genre) => {
          const res = await axios.get<{ results: TvShow[] }>(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genre.id}&page=1`
          );

          tvByGenre[genre.id] = res.data.results
            .filter((show) => show.poster_path)
            .slice(0, 4);
        })
      );

      set({ tvGenres: genres, tvByGenre });
    } catch (error) {
      console.error("Error fetching genres/TV shows:", error);
    }
  },

  // ✅ Fetch trending posters for backdrop
  fetchTrendingPosters: async (maxImages: number) => {
    try {
      const [res1, res2] = await Promise.all([
        axios.get<{ results: Movie[] }>(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=1`
        ),
        axios.get<{ results: Movie[] }>(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=2`
        ),
      ]);

      const allMovies = [...res1.data.results, ...res2.data.results];
      const posters = allMovies
        .filter((movie) => movie.poster_path)
        .slice(0, maxImages)
        .map((movie) => `${IMG_BASE}${movie.poster_path}`);

      set({ trendingPosters: posters });
    } catch (err) {
      console.error("Error fetching trending posters:", err);
    }
  },
}));
