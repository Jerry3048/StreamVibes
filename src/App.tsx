import React, { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  title: string;
  poster: string;
}

const API_KEY = "YOUR_TMDB_KEY"; // Replace with your TMDb key
const BASE_URL = "https://imdb.iamidiotareyoutoo.com/";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMovies = async () => {
    try {
      setLoading(true);

      // Pick a random page from popular movies (1–50)
      const randomPage = Math.floor(Math.random() * 50) + 1;

      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          language: "en-US",
          page: randomPage,
        },
      });

      const results = response.data.results;

      // Shuffle + take 10 movies
      const selected = results
        .sort(() => 0.5 - Math.random())
        .slice(0, 10)
        .map((movie: any) => ({
          title: movie.title,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "",
        }));

      setMovies(selected);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🎬 Random Movies</h1>

      {loading ? (
        <p className="text-center text-xl">Loading movies...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
          {movies.map((movie, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow hover:shadow-xl transition p-2"
            >
              {movie.poster ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-[300px] object-cover rounded"
                />
              ) : (
                <div className="w-full h-[300px] flex items-center justify-center bg-gray-300 rounded">
                  No Image
                </div>
              )}
              <p className="text-center mt-2 font-semibold text-sm">
                {movie.title}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;