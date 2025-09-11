import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { useMovieStore, type Movie } from "../store/MovieStore";

export default function GenrePage() {
  const { genreId } = useParams<{ genreId: string }>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { genres, fetchGenresAndMovies, apiKey, imgBase } = useMovieStore();

  const genreName =
    genres.find((g) => g.id.toString() === genreId)?.name || "Movies";

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        const res = await axios.get<{ results: Movie[]; total_pages: number }>(
          `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
        );
        setMovies(res.data.results.filter((m) => m.poster_path));
        setTotalPages(res.data.total_pages);
      } catch (err) {
        console.error("Error fetching genre movies:", err);
      }
    };

    fetchGenreMovies();
  }, [genreId, page, apiKey]);

  useEffect(() => {
    if (genres.length === 0) {
      fetchGenresAndMovies();
    }
  }, [genres.length, fetchGenresAndMovies]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">{genreName}</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform"
          >
            <img
              src={`${imgBase}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80"
            />
            <div className="p-2 text-white text-sm font-semibold">
              {movie.title}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-white">{page} / {totalPages}</span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          className="px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
