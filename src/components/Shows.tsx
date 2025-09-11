import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard"; // ✅ reuse card for shows too
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import type { Movie } from "../types"; // you can rename later to `Media`

const API_KEY = "c83a544dff93b9547ab40c6699cf9c47";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function Shows() {
  const [popularShows, setPopularShows] = useState<Movie[]>([]);
  const [trendingShows, setTrendingShows] = useState<Movie[]>([]);
  const [airingToday, setAiringToday] = useState<Movie[]>([]);
  const [topRatedShows, setTopRatedShows] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchShows = async () => {
    setLoading(true);
    try {
      const randomPage = (max: number) => Math.floor(Math.random() * max) + 1;

      const [popularRes, trendingRes, airingTodayRes, topRatedRes] =
        await Promise.all([
          axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=${randomPage(500)}`),
          axios.get(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}&page=${randomPage(50)}`),
          axios.get(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}&page=${randomPage(30)}`),
          axios.get(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${randomPage(50)}`),
        ]);

      setPopularShows(popularRes.data.results || []);
      setTrendingShows(trendingRes.data.results || []);
      setAiringToday(airingTodayRes.data.results || []);
      setTopRatedShows(topRatedRes.data.results || []);
    } catch (err) {
      console.error("Error fetching TV shows", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="animate-spin h-12 w-12 border-t-4 border-b-4 border-yellow-400 rounded-full"></div>
      </div>
    );
  }

  const handleShowClick = (id: number) => {
    window.open(`https://www.themoviedb.org/tv/${id}`, "_blank");
  };

  return (
    <div className="p-6 min-h-screen text-white space-y-12 border-1 w-[95%] mx-auto rounded-lg border-gray-800">
        <button>
        <h1 className="text-3xl font-bold mb-6 text-center bg-red-700 p-4 rounded-lg">Shows</h1>
        </button>
      <ShowSection title="Popular Shows" shows={popularShows} onMovieClick={handleShowClick} variant="default" />
      <ShowSection title="Trending Shows" shows={trendingShows} onMovieClick={handleShowClick} variant="trending" />
      <ShowSection title="Airing Today" shows={airingToday} onMovieClick={handleShowClick} variant="new" />
      <ShowSection title="Top Rated Shows" shows={topRatedShows} onMovieClick={handleShowClick} variant="must" />
    </div>
  );
}

type ShowSectionProps = {
  title: string;
  shows: Movie[];
  onMovieClick: (id: number) => void;
  variant: "default" | "trending" | "new" | "must";
};

function ShowSection({ title, shows, onMovieClick, variant }: ShowSectionProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(3);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(4);
      } else {
        setItemsPerPage(5);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  const totalPages = Math.ceil(shows.length / itemsPerPage);
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

  const visibleShows = shows.slice(startIndex, startIndex + itemsPerPage);

  return (
    <section >
      <div className="flex flex-col sm:flex-row sm:justify-between md:items-center mb-6">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {visibleShows.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            poster={`${IMG_BASE}${movie.poster_path}`}
            releaseDate={movie.release_date}
            rating={movie.vote_average}
            popularity={movie.popularity}
            variant={variant}
            onClick={() => onMovieClick(movie.id)}
            vote_count={movie.vote_count}
          />
        ))}
      </div>
    </section>
  );
}

export default Shows;
