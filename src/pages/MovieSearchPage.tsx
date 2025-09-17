import { useState } from "react";
import { useNavigate } from "react-router";
import { searchMovies, type Movie } from "../Services/Tmdb";
import AiChat from "../components/AiChat";

export default function MovieSearchPage() {
  const [manualQuery, setManualQuery] = useState("");
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const handleCardClick = (title: string) => {
    const slug = title.toLowerCase().replace(/\s+/g, "-");
    navigate(`/movie/${slug}`);
  };

  const handleManualSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!manualQuery.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const movies = await searchMovies(manualQuery);
      setResults(movies);
      setManualQuery("");
    } catch (err) {
      console.error("Manual search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 text-white space-y-8">
      <h1 className="text-2xl font-bold">Search Movies</h1>

      {/* Manual Search */}
      <form onSubmit={handleManualSearch} className="flex gap-2">
        <input
          type="text"
          value={manualQuery}
          onChange={(e) => setManualQuery(e.target.value)}
          placeholder="Search by movie title..."
          className="p-2 rounded bg-gray-800 text-white w-full"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </form>

      {/* AI Chatbot */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Ask the AI Assistant</h2>
        <AiChat />
      </div>

      {/* Results */}
      {loading && <p className="text-gray-400">Loading...</p>}
      {!loading && searched && results.length === 0 && (
        <p className="text-gray-400">❌ No movie matches your search</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {results.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleCardClick(movie.title)}
            className="bg-gray-900 p-2 rounded cursor-pointer hover:scale-105 transition"
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded mb-2"
              />
            ) : (
              <div className="h-64 flex items-center justify-center bg-gray-700 rounded">
                No Image
              </div>
            )}
            <h2 className="text-sm font-semibold">{movie.title}</h2>
            <p className="text-xs text-gray-400">
              {movie.release_date || "Unknown"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
