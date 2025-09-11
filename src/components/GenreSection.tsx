import { useEffect, useState } from "react";
import { useMovieStore } from "../store/MovieStore";
import GenreCard from "./GenreCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export default function Genres() {
  const { genres, moviesByGenre, fetchGenresAndMovies } = useMovieStore();
  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  // ✅ Responsive ITEMS_PER_PAGE based on screen size
 useEffect(() => {
  const updateItemsPerPage = () => {
    if (window.innerWidth < 640) {
      setItemsPerPage(2); // small (sm)
    } else if (window.innerWidth < 1024) {
      setItemsPerPage(3); // medium (md)
    } else if (window.innerWidth < 1280) {
      setItemsPerPage(4); // large (lg)
    } else {
      setItemsPerPage(6); // extra large (xl and above)
    }
  };

    updateItemsPerPage(); // run once on mount
    window.addEventListener("resize", updateItemsPerPage);

    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    if (genres.length === 0) {
      fetchGenresAndMovies();
    }
  }, [genres, fetchGenresAndMovies]);

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
    <div className="relative">
      <div className="md:flex items-center justify-between w-[95%] mx-auto mb-4 space-y-2">
      <div className="text-center md:text-left"> 
         <h2 className="text-2xl font-bold">Explore Our Wide Variety Of Categories</h2>
         <p>Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new</p>
      </div>

        <div className="bg-gray-950 p-4 rounded-lg text-white flex items-center space-x-3 justify-center w-fit mx-auto md:mx-0">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="text-2xl disabled:opacity-30 bg-gray-500 p-1 rounded-lg"
          >
            <FaArrowLeft />
          </button>

          {/* Page Dots */}
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

          {/* Right Arrow */}
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2  xl:gap-6 flex-1">
        {visibleGenres.map((genre) => (
          <GenreCard
            key={genre.id}
            genreId={genre.id}
            genreName={genre.name}
            movies={moviesByGenre[genre.id] || []}
          />
        ))}
      </div>
    </div>
  );
}