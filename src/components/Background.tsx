import { useEffect, useState } from "react";
import { useMovieStore } from "../store/MovieStore";
import Header from "./Header";
import Logo from "/Logo/Abstract Design.png";
import { FaArrowRight } from "react-icons/fa";

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
    <div className="relative h-screen lg:h-full w-full overflow-hidden">
      {/* Background Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 h-full w-full">
        {trendingPosters.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Movie poster"
            className="object-cover w-full h-full"
          />
        ))}
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/100 z-0" />

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <Header />
      </div>

      {/* Hero Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <img
          src={Logo}
          alt="Logo"
          className="w-40 h-40 md:w-60 md:h-60 xl:w-90 xl:h-90 object-contain mb-20 md:mb-10 mt-20"
        />
        <div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            The Best Streaming Experience
          </h1>
          <p className="text-md md:text-lg mb-6 md:max-w-[90%] mx-auto">
            StreamVibe is the best streaming experience for watching your
            favorite movies and shows on demand, anytime, anywhere. With
            StreamVibe, you can enjoy a wide variety of content, including the
            latest blockbusters, classic movies, popular TV shows, and more.
          </p>
          <button className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-lg font-semibold transition flex items-center mx-auto gap-3">
            Start Watching
            <FaArrowRight className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}