import { useEffect, useState } from "react";
import { useParams, useNavigate} from "react-router";
import axios from "axios";
import { useMovieStore, type Movie, type TvShow } from "../store/MovieStore";

export default function GenrePage() {
  const { genreId, type } = useParams<{ genreId: string; type: "movie" | "tv" }>();
  const [items, setItems] = useState<(Movie | TvShow)[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleCardClick = (name: string, type: "movie" | "tv") => {
    const slug = name.toLowerCase().replace(/\s+/g, "-");
    navigate(`/${type}/${slug}`);
  };

  const {
    movieGenres,
    tvGenres,
    fetchGenresAndMovies,
    fetchGenresAndTvShows,
    apiKey,
    imgBase,
  } = useMovieStore();

  const genres = type === "tv" ? tvGenres : movieGenres;
  const genreName = genres.find((g) => g.id.toString() === genreId)?.name || "Browse";

  useEffect(() => {
    const fetchGenreItems = async () => {
      try {
        const endpoint = type === "tv" ? "discover/tv" : "discover/movie";
        const res = await axios.get<{ results: (Movie | TvShow)[]; total_pages: number }>(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&with_genres=${genreId}&page=${page}`
        );

        setItems(res.data.results.filter((m) => m.poster_path));
        setTotalPages(res.data.total_pages);
      } catch (err) {
        console.error("Error fetching genre items:", err);
      }
    };

    fetchGenreItems();
  }, [genreId, page, apiKey, type]);

  useEffect(() => {
    if (type === "movie" && movieGenres.length === 0) {
      fetchGenresAndMovies();
    }
    if (type === "tv" && tvGenres.length === 0) {
      fetchGenresAndTvShows();
    }
  }, [type, movieGenres.length, tvGenres.length, fetchGenresAndMovies, fetchGenresAndTvShows]);

  return (
    <div className="px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-6">{genreName} ({(type ?? "movie").toUpperCase()})</h1>

      {/* Grid of items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {items.map((item) => {
            const itemName = "title" in item ? item.title : item.name;
            const itemType = "title" in item ? "movie" : "tv";

            return (
              <div
                key={item.id}
                onClick={() => handleCardClick(itemName, itemType)}
                className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer"
              >
                <img
                  src={`${imgBase}${item.poster_path}`}
                  alt={itemName}
                  className="w-full h-80"
                />
                <div className="p-2 text-white text-sm font-semibold">
                  {itemName}
                </div>
              </div>
            );
          })}

      </div>

      {/* Pagination */}
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
