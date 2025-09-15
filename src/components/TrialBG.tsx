import { useEffect, useState } from "react";
import { useMovieStore } from "../store/MovieStore";

export default function MovieBackdrop() {
  const { trendingPosters, fetchTrendingPosters } = useMovieStore();
  const [maxImages, setMaxImages] = useState(40);

  // ✅ Responsive image count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setMaxImages(12);
      } else if (window.innerWidth < 1024) {
        setMaxImages(28);
      } else {
        setMaxImages(40);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Fetch posters using Zustand
  useEffect(() => {
    fetchTrendingPosters(maxImages);
  }, [maxImages, fetchTrendingPosters]);

  return (
    <div className="relative h-[30vh] md:h-[20vh]  overflow-hidden mx-auto rounded-lg shadow-2xs">
      {/* Background Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-20 h-full w-full gap-2">
        {trendingPosters.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Movie poster"
            className="object-cover w-30 h-20"
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-red-500/50 z-10" />

      {/* Hero Section */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between text-white w-[90%] mx-auto z-20">
        <div className="text-center md:text-left max-w-2xl">
          <h1 className="text-xl sm:text-2xl xl:text-5xl font-bold mb-4">
            Start your free trial today!
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-6 text-gray-300">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of StreamVibe.
          </p>
        </div>

        <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-semibold transition">
          Start a Free Trial
        </button>
      </div>
    </div>
  );
}