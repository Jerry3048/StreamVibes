import { FaStar } from "react-icons/fa";

interface MovieCardProps {
  title: string;
  poster: string;
  overview: string;
  releaseDate: string;
  rating: number;
  onClick?: () => void;
}

function MovieCard({ title, poster, overview, releaseDate, rating, onClick }: MovieCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition cursor-pointer flex flex-col"
    >
      {/* Poster */}
      <img src={poster} alt={title} className="w-full h-[300px] object-cover" />

      {/* Info */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white truncate">{title}</h3>
        <p className="text-sm text-gray-400">📅 {releaseDate}</p>

        {/* Rating */}
        <div className="flex items-center mt-2 text-yellow-400">
          <FaStar className="mr-1" />
          <span>{rating.toFixed(1)}</span>
        </div>

        {/* Overview */}
        <p className="text-sm text-gray-300 mt-3 line-clamp-3">{overview}</p>
      </div>
    </div>
  );
}

export default MovieCard;
