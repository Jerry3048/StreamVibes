import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Movie, Credits, Review, CrewMember } from "../types";

const API_KEY = "c83a544dff93b9547ab40c6699cf9c47";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieViewPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!movieId) return;

      try {
        const [detailsRes, creditsRes, reviewsRes] = await Promise.all([
          axios.get<Movie>(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`),
          axios.get<Credits>(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`),
          axios.get<{ results: Review[] }>(`${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`),
        ]);

        setMovie(detailsRes.data);
        setCredits(creditsRes.data);
        setReviews(reviewsRes.data.results);
      } catch (err) {
        console.error("Error fetching movie details", err);
      }
    };

    fetchDetails();
  }, [movieId]);

  if (!movie) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  // ✅ Extract director & music director from crew
  const director = credits?.crew.find((c: CrewMember) => c.job === "Director");
  const musicDirector = credits?.crew.find((c: CrewMember) => c.job === "Original Music Composer");

  return (
    <div className="p-6 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : ""}
          alt={movie.title || movie.name || "Poster"}
          className="w-64 rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{movie.title || movie.name}</h1>
          <p className="text-gray-400 italic">{movie.tagline}</p>
          <p className="mt-4">{movie.overview}</p>

          <div className="mt-4 space-y-2">
            <p><strong>Release Year:</strong> {movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0] || "N/A"}</p>
            <p><strong>Languages:</strong> {movie.spoken_languages.map((l) => l.english_name).join(", ")}</p>
            <p><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
            <p><strong>Rating:</strong> ⭐ {movie.vote_average} / 10 (TMDB)</p>
            {director && <p><strong>Director:</strong> {director.name}</p>}
            {musicDirector && <p><strong>Music Director:</strong> {musicDirector.name}</p>}
          </div>
        </div>
      </div>

      {/* Cast */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Cast</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {credits?.cast?.slice(0, 10).map((actor) => (
            <div key={actor.id} className="w-32 text-center">
              <img
                src={actor.profile_path ? `${IMG_BASE}${actor.profile_path}` : "https://via.placeholder.com/100"}
                alt={actor.name}
                className="w-24 h-24 object-cover rounded-full mx-auto"
              />
              <p className="mt-2 text-sm">{actor.name}</p>
              <p className="text-xs text-gray-400">{actor.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          reviews.map((rev) => (
            <div key={rev.id} className="mb-4 p-4 bg-gray-800 rounded-lg">
              <p className="font-semibold">{rev.author}</p>
              <p className="text-gray-400 text-sm">{rev.content.substring(0, 200)}...</p>
            </div>
          ))
        ) : (
          <p>No reviews available.</p>
        )}
      </div>
    </div>
  );
}

export default MovieViewPage;
