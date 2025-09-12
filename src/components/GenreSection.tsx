import { useEffect, useState } from "react";
import { useMovieStore } from "../store/MovieStore";
import GenreSection from "./Genre";

// ✅ Reusable hook for responsive itemsPerPage
function useResponsiveItemsPerPage() {
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
        setItemsPerPage(6);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  return itemsPerPage;
}

// 🎬 Movies Section
export function MovieGenresSection() {
  const { movieGenres, moviesByGenre, fetchGenresAndMovies } = useMovieStore();
  const itemsPerPage = useResponsiveItemsPerPage();

  useEffect(() => {
    if (movieGenres.length === 0) fetchGenresAndMovies();
  }, [movieGenres, fetchGenresAndMovies]);

  return (
    <GenreSection
      title="Explore Movie Categories"
      description="Whether you're looking for a comedy, a drama, or an action-packed film — we’ve got movies for you."
      genres={movieGenres}
      dataByGenre={moviesByGenre}
      itemsPerPage={itemsPerPage}
      type="movie"
    />
  );
}

// 📺 TV Shows Section
export function TvGenresSection() {
  const { tvGenres, tvByGenre, fetchGenresAndTvShows } = useMovieStore();
  const itemsPerPage = useResponsiveItemsPerPage();

  useEffect(() => {
    if (tvGenres.length === 0) fetchGenresAndTvShows();
  }, [tvGenres, fetchGenresAndTvShows]);

  return (
    <GenreSection
      title="Explore TV Show Categories"
      description="From sitcoms to documentaries — discover the TV shows you'll love."
      genres={tvGenres}
      dataByGenre={tvByGenre}
      itemsPerPage={itemsPerPage}
      type="tv"
    />
  );
}
