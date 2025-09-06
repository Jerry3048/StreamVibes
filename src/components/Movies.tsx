import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types"; 


const API_KEY = "c83a544dff93b9547ab40c6699cf9c47";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function Movies() {
const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [popularPage, setPopularPage] = useState(1);
  const [trendingPage, setTrendingPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const [popularRes, trendingRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${popularPage}`),
        axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${trendingPage}`)
      ]);

      setPopularMovies(popularRes.data.results);
      setTrendingMovies(trendingRes.data.results);
    } catch (err) {
      console.error("Error fetching movies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popularPage, trendingPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-yellow-400 rounded-full"></div>
      </div>
    );
  }

  // 👇 function to open TMDB movie page
  const handleMovieClick = (id: number) => {
    window.open(`https://www.themoviedb.org/movie/${id}`, "_blank");
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white space-y-10">
      {/* Popular Movies */}
      <section>
        <h2 className="text-2xl font-bold mb-6">⭐ Popular Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {popularMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`${IMG_BASE}${movie.poster_path}`}
              overview={movie.overview}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
              onClick={() => handleMovieClick(movie.id)} // 🔥 opens TMDB link
            />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={popularPage === 1}
            onClick={() => setPopularPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 rounded"
          >
            ◀ Prev
          </button>
          <span className="px-2">Page {popularPage}</span>
          <button
            onClick={() => setPopularPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Next ▶
          </button>
        </div>
      </section>

      {/* Trending Movies */}
      <section>
        <h2 className="text-2xl font-bold mb-6">🔥 Trending Movies</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              poster={`${IMG_BASE}${movie.poster_path}`}
              overview={movie.overview}
              releaseDate={movie.release_date}
              rating={movie.vote_average}
              onClick={() => handleMovieClick(movie.id)} // 🔥 opens TMDB link
            />
          ))}
        </div>
        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={trendingPage === 1}
            onClick={() => setTrendingPage((p) => Math.max(p - 1, 1))}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-500 rounded"
          >
            ◀ Prev
          </button>
          <span className="px-2">Page {trendingPage}</span>
          <button
            onClick={() => setTrendingPage((p) => p + 1)}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
          >
            Next ▶
          </button>
        </div>
      </section>
    </div>
  );
}

export default Movies;