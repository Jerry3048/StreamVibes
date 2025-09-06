import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import type { Movie } from "../store/MovieStore";

const API_KEY = "c83a544dff93b9547ab40c6699cf9c47";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

export default function GenrePage() {
  const { genreId } = useParams<{ genreId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        const res = await axios.get<{ results: Movie[] }>(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=1`
        );
        setMovies(res.data.results.filter((m) => m.poster_path));
      } catch (err) {
        console.error("Error fetching genre movies:", err);
      }
    };

    fetchGenreMovies();
  }, [genreId]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={`${IMG_BASE}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-60 object-cover"
            />
            <div className="p-2 text-white text-sm font-semibold">
              {movie.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}