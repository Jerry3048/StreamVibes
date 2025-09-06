import { useNavigate } from "react-router";
import type { Movie } from "../store/MovieStore";
import { FaArrowRight } from "react-icons/fa";

interface GenreCardProps {
  genreId: number;
  genreName: string;
  movies: Movie[];
}

export default function GenreCard({ genreId, genreName, movies }: GenreCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/genre/${genreId}`)}
      className="cursor-pointer bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
    >
      {/* Top: 4 Images in a grid */}
      <div className="grid grid-cols-2 grid-rows-2 h-60 w-full gap-1">
        {movies.slice(0, 4).map((movie) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full"
          />
        ))}
      </div>

      {/* Bottom: Genre Title */}
      <div className="p-3 text-center bg-black text-white font-semibold flex items-center justify-between">
        {genreName}
      <FaArrowRight className="text-white" />
      </div>
    </div>
  );
}