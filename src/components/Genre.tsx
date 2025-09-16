import { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowLeft, FaArrowRight, FaArrowRight as ArrowIcon } from "react-icons/fa";
import type { Genre, Movie, TvShow } from "../store/MovieStore";

interface GenresProps {
  title: string;
  description: string;
  genres: Genre[];
  dataByGenre: Record<number, Movie[] | TvShow[]>;
  itemsPerPage: number;
  type: "movie" | "tv";
}

export default function Genres({
  title,
  description,
  genres,
  dataByGenre,
  itemsPerPage,
  type,
}: GenresProps) {
  const [startIndex, setStartIndex] = useState(0);
  const navigate = useNavigate();

  const totalPages = Math.ceil(genres.length / itemsPerPage);
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

  const visibleGenres = genres.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="relative space-y-6">
      {/* Header */}
      <div className="md:flex items-center justify-between w-full mx-auto mb-4 space-y-2">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p>{description}</p>
        </div>

        {/* Pagination Controls */}
        <div className="bg-gray-950 p-4 rounded-lg text-white flex items-center space-x-3 justify-center w-fit mx-auto md:mx-0">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="text-2xl disabled:opacity-30 bg-gray-500 p-1 rounded-lg"
          >
            <FaArrowLeft />
          </button>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <span
                key={idx}
                className={`w-2 h-1 md:w-3 lg:w-4 rounded-full cursor-pointer ${
                  idx === currentPage ? "bg-red-500" : "bg-gray-400"
                }`}
                onClick={() => setStartIndex(idx * itemsPerPage)}
              ></span>
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="text-2xl disabled:opacity-30 bg-gray-500 p-1 rounded-lg"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* Genre Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {visibleGenres.map((genre) => {
          const items = dataByGenre[genre.id] || [];

          return (
            <div
              key={genre.id}
              onClick={() => navigate(`/genre/${type}/${genre.id}`)}
              className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
            >
              {/* Preview posters */}
              <div className="grid grid-cols-2 grid-rows-2 h-80 w-full gap-1">
                {items.slice(0, 4).map((item) => (
                  <img
                    key={item.id}
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={"title" in item ? item.title : item.name}
                    className="w-full h-full object-cover"
                  />
                ))}
              </div>

              {/* Genre Name */}
              <div className="p-3 text-center bg-black text-white font-semibold flex items-center justify-between">
                {genre.name}
                <ArrowIcon className="text-white" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
