import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Movie } from "../types";

const API_KEY = "c83a544dff93b9547ab40c6699cf9c47";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MoviesAndShows() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleaseMovies, setNewReleaseMovies] = useState<Movie[]>([]);
  const [mustWatchMovies, setMustWatchMovies] = useState<Movie[]>([]);

  const [popularShows, setPopularShows] = useState<Movie[]>([]);
  const [trendingShows, setTrendingShows] = useState<Movie[]>([]);
  const [newReleaseShows, setNewReleaseShows] = useState<Movie[]>([]);
  const [mustWatchShows, setMustWatchShows] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"movies" | "shows">("movies"); // toggle for small screens

  const fetchData = async () => {
    setLoading(true);
    try {

       const randomPage = (max: number) => Math.floor(Math.random() * max) + 1;
      const [popularMoviesRes,trendingMoviesRes,newReleaseMoviesRes,mustWatchMoviesRes,popularShowsRes,trendingShowsRes,newReleaseShowsRes,mustWatchShowsRes,
      ] = await Promise.all([
          axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${randomPage(500)}`),
          axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${randomPage(10)}`),
          axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${randomPage(5)}`),
          axios.get(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${randomPage(50)}`),

          axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${randomPage(500)}`),
          axios.get(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${randomPage(20)}`),
          axios.get(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=${randomPage(5)}`),
          axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${randomPage(50)}`),
      ]);

      setPopularMovies(popularMoviesRes.data.results || []  );
      setTrendingMovies(trendingMoviesRes.data.results || [] );
      setNewReleaseMovies(newReleaseMoviesRes.data.results || []  );
      setMustWatchMovies(mustWatchMoviesRes.data.results || [] );

      setPopularShows(popularShowsRes.data.results || [] );
      setTrendingShows(trendingShowsRes.data.results || [] );
      setNewReleaseShows(newReleaseShowsRes.data.results || [] );
      setMustWatchShows(mustWatchShowsRes.data.results || [] );
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-yellow-400 rounded-full"></div>
      </div>
    );
  }

  const handleCardClick = (id: number, type: "movie" | "tv") => {
    window.open(`https://www.themoviedb.org/${type}/${id}`, "_blank");
  };

  return (
    <div className="p-6 min-h-screen text-white space-y-12">
      {/* Toggle only on small screens */}
      <div className="flex sm:hidden justify-center mb-6 p-2 bg-gray-800 rounded-lg w-fit mx-auto">
        <button
          onClick={() => setActiveTab("movies")}
          className={`px-4 py-2 rounded-l-lg ${
            activeTab === "movies" ? "bg-black text-white" : "bg-gray-700"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setActiveTab("shows")}
          className={`px-4 py-2 rounded-r-lg  ${
            activeTab === "shows" ? "bg-black text-white" : "bg-gray-700"
          }`}
        >
          Shows
        </button>
      </div>

      {/* Movies Section */}
      {(activeTab === "movies" || window.innerWidth >= 640) && (
        <div className="border border-gray-700 rounded-xl p-4 space-y-12 relative">
        <h1 className="absolute -top-4 left-4 bg-gray-900 px-3 py-1 text-lg font-semibold rounded-md ">
          Movies
        </h1>
          <MovieSection
            title="Popular Movies"
            movies={popularMovies}
            onCardClick={(id) => handleCardClick(id, "movie")}
          />
          <MovieSection
            title="Trending Movies"
            movies={trendingMovies}
            onCardClick={(id) => handleCardClick(id, "movie")}
          />
          <MovieSection
            title="New Releases"
            movies={newReleaseMovies}
            onCardClick={(id) => handleCardClick(id, "movie")}
          />
          <MovieSection
            title="Must Watch"
            movies={mustWatchMovies}
            onCardClick={(id) => handleCardClick(id, "movie")}
          />
        </div>
      )}

      {/* Shows Section */}
      {(activeTab === "shows" || window.innerWidth >= 640) && (
         <div className="border border-gray-700 rounded-xl p-4 space-y-12 relative">
        <h1 className="absolute -top-4 left-4 bg-gray-900 px-3 py-1 text-lg font-semibold rounded-md">
          Shows
        </h1>
          <MovieSection
            title="Popular Shows"
            movies={popularShows}
            onCardClick={(id) => handleCardClick(id, "tv")}
          />
          <MovieSection
            title="Trending Shows"
            movies={trendingShows}
            onCardClick={(id) => handleCardClick(id, "tv")}
          />
          <MovieSection
            title="Currently Airing"
            movies={newReleaseShows}
            onCardClick={(id) => handleCardClick(id, "tv")}
          />
          <MovieSection
            title="Top Rated Shows"
            movies={mustWatchShows}
            onCardClick={(id) => handleCardClick(id, "tv")}
          />
        </div>
      )}
    </div>
  );
}

type MovieSectionProps = {
  title: string;
  movies: Movie[];
  onCardClick: (id: number) => void;
};

function MovieSection({ title, movies, onCardClick }: MovieSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 768) {
        setItemsPerPage(3);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(movies.length / itemsPerPage);
  const currentPage = Math.floor(startIndex / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setStartIndex(startIndex + itemsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setStartIndex(startIndex - itemsPerPage);
    }
  };

  const visibleMovies = movies.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section>
      <div className="flex flex-col sm:flex-row sm:justify-between md:items-center mb-6 ">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="bg-gray-950 p-3 rounded-lg text-white flex items-center space-x-3 justify-center">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="text-xl disabled:opacity-30 bg-gray-600 hover:bg-gray-500 p-2 rounded-lg"
          >
            <FaArrowLeft />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-1 md:w-3 md:h-1 rounded-full cursor-pointer transition ${
                  idx === currentPage ? "bg-red-500" : "bg-gray-400"
                }`}
                onClick={() => setStartIndex(idx * itemsPerPage)}
              ></span>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="text-xl disabled:opacity-30 bg-gray-600 hover:bg-gray-500 p-2 rounded-lg"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6">
        {visibleMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title || movie.name || "Untitled"}
            poster={`${IMG_BASE}${movie.poster_path}`}
            releaseDate={movie.release_date || movie.first_air_date || "Unknown"}
            rating={movie.vote_average}
            popularity={movie.popularity}
            onClick={() => onCardClick(movie.id)}
            vote_count={movie.vote_count}
            variant={
              title.includes("Popular") ? "default" :
              title.includes("Trending") ? "trending" :
              title.includes("New") || title.includes("Currently Airing") ? "new" :
              title.includes("Must") || title.includes("Top Rated") ? "must" :
              "default"
            }
          />
        ))}
      </div>
    </section>
  );
}

export default MoviesAndShows;
