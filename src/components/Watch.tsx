import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlay,
  FaPlus,
  FaVolumeMute,
  FaVolumeUp,
  FaHeart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import type { Movie } from "../types";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function Watch() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState(false);
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1024); // lg breakpoint

  // ✅ Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch movies
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axios.get<{ results: Movie[] }>(
        `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
      );

      const shuffled = res.data.results
        .filter((m) => m.backdrop_path || m.poster_path)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);

      setMovies(shuffled);
      setCurrentIndex(0);
    };

    fetchMovies();
  }, []);

  if (movies.length === 0) {
    return <div className="text-white p-6">Loading...</div>;
  }

  const currentMovie = movies[currentIndex];

  // ✅ Use backdrop on large screens, poster on small
  const imageUrl = isLarge
    ? `${IMG_BASE}${currentMovie.backdrop_path}`
    : `${IMG_BASE}${currentMovie.poster_path}`;

  return (
    <div
      className="relative min-h-[90vh] text-white flex flex-col justify-end"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-black/100 z-0"></div>

      {/* Movie details */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pb-32">
        <h1 className="text-4xl font-bold">{currentMovie.title}</h1>
        <p className="mt-4 text-lg opacity-90 line-clamp-4 max-w-[80%] hidden md:block">
          {currentMovie.overview}
        </p>

        {/* Action buttons */}
        <div className="flex space-x-4 mt-6">
          <button className="bg-red-500 px-6 py-2 rounded flex items-center space-x-2">
            <FaPlay /> <span>Play Now</span>
          </button>
          <button className="bg-black px-2 py-1 rounded flex items-center">
            <FaPlus />
          </button>
          <button
            onClick={() => setLiked(!liked)}
            className="bg-black px-2 py-1 rounded flex items-center"
          >
            <FaHeart className={liked ? "text-red-500" : ""} />
          </button>
          <button
            onClick={() => setMuted(!muted)}
            className="bg-black px-2 py-1 rounded flex items-center"
          >
            {muted ? <FaVolumeMute /> : <FaVolumeUp />}
          </button>
        </div>
      </div>

      {/* Navigation (arrows + dots) at bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-between items-center px-6 z-20">
        {/* Left arrow */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1))
          }
          className="p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
        >
          <FaChevronLeft size={24} />
        </button>

        {/* Dots */}
        <div className="flex space-x-3">
          {movies.map((_, i) => (
            <span
              key={i}
              className={`w-3 h-1 rounded-full ${
                i === currentIndex ? "bg-red-500" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1))
          }
          className="p-3 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}

export default Watch;
