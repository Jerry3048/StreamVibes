import { useNavigate } from "react-router";
import type { Movie, TvShow } from "../store/MovieStore";
import { FaArrowRight } from "react-icons/fa";

interface GenreCardProps {
  genreId: number;
  genreName: string;
  type: "movie" | "tv"; // 👈 add type so we know where to go
  items: (Movie | TvShow)[];
}

export default function GenreCard({ genreId, genreName, type, items }: GenreCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/genre/${type}/${genreId}`)} // 👈 go to /genre/movie/:id or /genre/tv/:id
      className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
    >
      {/* Preview posters */}
      <div className="grid grid-cols-2 grid-rows-2 h-70 w-full gap-1">
        {items.slice(0, 4).map((item) => (
          <img
            key={item.id}
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={"title" in item ? item.title : item.name}
            className="w-full h-full"
          />
        ))}
      </div>

      {/* Genre Name */}
      <div className="p-3 text-center bg-black text-white font-semibold flex items-center justify-between">
        {genreName}
        <FaArrowRight className="text-white" />
      </div>
    </div>
  );
}
