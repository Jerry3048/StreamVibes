import { FaStar, FaClock, FaEye } from "react-icons/fa";

type MovieCardProps = {
  title: string;
  poster: string;
  releaseDate: string;
  rating: number; // TMDB rating out of 10
  popularity: number;
  vote_count: number;

  variant: "default" | "trending" | "new" | "must";
  onClick: () => void;
};

function MovieCard({
  title,
  poster,
  releaseDate,
  rating,
  popularity,
  variant,
  vote_count,
  onClick,
}: MovieCardProps) {
  // Convert rating (0–10) into 5-star scale
  const stars = Math.round(rating / 2);

  // ✅ Format likes into k (e.g., 20k, 1.2k)
  const formatLikes = (num: number) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    }
    return num.toString();
  };

  return (
    <div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform text-gray-400"
      onClick={onClick}
    >
      <img src={poster} alt={title} className="w-full h-90" />
      <div className="p-3">
        {/* Default (just stars) */}
        {variant === "default" && (
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={i < stars ? "text-red-500" : "text-gray-500"}
              />
            ))}
          </div>
        )}

        {/* Trending → show duration + views */}
        {variant === "trending" && (
          <div className="text-sm flex justify-between">
            <div className="flex items-center space-x-2">
              <FaClock className="text-red-500" />
              <span>120 min</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEye className="text-blue-400" />
              <span>{Math.round(popularity).toLocaleString()} </span>
            </div>
          </div>
        )}

        {/* New Release → show release date */}
        {variant === "new" && (
          <div className="flex items-center space-x-2 text-sm">
            <FaClock className="" />
            <span>Released: {releaseDate}</span>
          </div>
        )}

        {/* Must Watch → show duration, stars, and likes */}
        {variant === "must" && (
          <div className="lg:flex justify-between text-sm">
            <div className="flex items-center space-x-2">
              <FaClock className="text-gray-500" />
              <span>140 min</span>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < stars ? "text-red-500" : "text-gray-500"}
                  />
                ))}
              </div>
               <span> {formatLikes(vote_count)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieCard;