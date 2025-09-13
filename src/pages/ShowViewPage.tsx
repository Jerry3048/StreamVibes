import { useParams } from "react-router";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import type {
  Credits,
  Review,
  CrewMember,
  Episode,
  Show,
} from "../types";
import {
  FaPlay,
  FaPlus,
  FaHeart,
  FaVolumeMute,
  FaVolumeUp,
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import Footer from "../components/Footer";
import TrialBG from "../components/TrialBG";

const API_KEY = "c83a544dff93b9547ab40c6699cf9c47";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function ShowViewPage() {
  const { showName } = useParams<{ showName: string }>();

  const [show, setShow] = useState<Show | null>(null);
  const [credits, setCredits] = useState<Credits | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [selectedSeason, setSelectedSeason] = useState<number | null>(null);

  const [liked, setLiked] = useState(false);
  const [muted, setMuted] = useState(true);
  const [castIndex, setCastIndex] = useState(0);
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [loadingSeason, setLoadingSeason] = useState<number | null>(null);

  const toggleReview = (id: string) => {
    setExpandedReviews((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!showName) return;

      try {
        const searchRes = await axios.get<{ results: Show[] }>(
          `${BASE_URL}/search/tv?api_key=${API_KEY}&query=${showName}`
        );

        const foundShow = searchRes.data.results[0];
        if (!foundShow) return;

        const showId = foundShow.id;

        const [detailsRes, creditsRes, reviewsRes] = await Promise.all([
          axios.get<Show>(
            `${BASE_URL}/tv/${showId}?api_key=${API_KEY}&language=en-US`
          ),
          axios.get<Credits>(
            `${BASE_URL}/tv/${showId}/credits?api_key=${API_KEY}&language=en-US`
          ),
          axios.get<{ results: Review[] }>(
            `${BASE_URL}/tv/${showId}/reviews?api_key=${API_KEY}&language=en-US`
          ),
        ]);

        setShow(detailsRes.data);
        setCredits(creditsRes.data);
        setReviews(reviewsRes.data.results);
      } catch (err) {
        console.error("Error fetching show details", err);
      }
    };

    fetchDetails();
  }, [showName]);

  // Fetch episodes for a season
  const fetchSeasonEpisodes = async (seasonNumber: number) => {
    if (!show) return;
    try {
      setLoadingSeason(seasonNumber);
      const res = await axios.get<{ episodes: Episode[] }>(
        `${BASE_URL}/tv/${show.id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
      );

      setShow((prev) =>
        prev
          ? {
              ...prev,
              seasons: prev.seasons.map((s) =>
                s.season_number === seasonNumber
                  ? { ...s, episodes: res.data.episodes }
                  : s
              ),
            }
          : prev
      );
    } catch (err) {
      console.error("Error fetching season episodes", err);
    } finally {
      setLoadingSeason(null);
    }
  };

  useEffect(() => {
    if (reviews.length > 0) {
      const shuffled = [...reviews].sort(() => 0.5 - Math.random());
      setSelectedReviews(shuffled.slice(0, 8));
      setReviewIndex(0);
    }
  }, [reviews]);

  if (!show) {
    return <div className="text-white text-center p-10">Loading...</div>;
  }

  const director = credits?.crew.find((c: CrewMember) => c.job === "Director");
  const musicDirector = credits?.crew.find(
    (c: CrewMember) => c.job === "Original Music Composer"
  );

  const backdropUrl = show.backdrop_path
    ? `${IMG_BASE}${show.backdrop_path}`
    : show.poster_path
    ? `${IMG_BASE}${show.poster_path}`
    : "";

  const posterUrl = show.poster_path ? `${IMG_BASE}${show.poster_path}` : "";

  const isLargeScreen = window.innerWidth >= 1024;
  const castChunkSize = isLargeScreen ? 8 : 4;
  const visibleCast = credits?.cast?.slice(
    castIndex,
    castIndex + castChunkSize
  );

  const nextCast = () => {
    if (!credits?.cast) return;
    setCastIndex((prev) =>
      prev + castChunkSize >= credits.cast.length ? 0 : prev + castChunkSize
    );
  };

  const prevCast = () => {
    if (!credits?.cast) return;
    setCastIndex((prev) =>
      prev - castChunkSize < 0
        ? Math.max(credits.cast.length - castChunkSize, 0)
        : prev - castChunkSize
    );
  };

  const nextReviews = () => {
    if (reviewIndex + 2 < selectedReviews.length) {
      setReviewIndex((prev) => prev + 2);
    }
  };

  const prevReviews = () => {
    if (reviewIndex - 2 >= 0) {
      setReviewIndex((prev) => prev - 2);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const outOfFive = rating / 2;

    for (let i = 1; i <= 5; i++) {
      if (outOfFive >= i) {
        stars.push(<FaStar key={i} className="text-red-500" />);
      } else if (outOfFive >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-red-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-600" />);
      }
    }
    return stars;
  };

  return (
    <div className="text-white space-y-6 ">
      <Header />

      <div className="w-[95%] mx-auto space-y-6">
        {/* Hero Section */}
        <div
          className="relative min-h-[90vh] flex flex-col justify-end rounded-lg"
          style={{
            backgroundImage: `url(${isLargeScreen ? backdropUrl : posterUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/100"></div>

          <div className="relative z-10 flex flex-col items-center text-center px-6 pb-20">
            <h1 className="text-4xl font-bold">{show.name}</h1>
            <p className="mt-4 text-lg opacity-90 max-w-[90%] hidden md:block">
              {show.overview}
            </p>
            <div className="md:flex md:space-x-4 mt-6">
              <button className="bg-red-500 px-6 py-2 rounded flex items-center space-x-2">
                <FaPlay /> <span>Play Now</span>
              </button>
              <div className="flex space-x-2 justify-center mt-4 md:mt-0">
                <button className="bg-black px-2 py-1 rounded flex items-center">
                  <FaPlus />
                </button>
                <button
                  onClick={() => setLiked(!liked)}
                  className="bg-black px-2 py-1 rounded flex items-center"
                >
                  <FaHeart className={liked ? "text-red-500" : ""} />
                </button>
                <button
                  onClick={() => setMuted(!muted)}
                  className="bg-black px-2 py-1 rounded flex items-center"
                >
                  {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column (2/3) */}
          <div className="space-y-8 md:col-span-2">
            {/* Seasons & Episodes */}
            <div className="px-6 py-6 bg-black/30 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Seasons & Episodes</h2>
              <div className="">
                {show.seasons.map((season) => {
                  const isSelected = selectedSeason === season.season_number;

                  return (
                    <div
                      key={season.season_number}
                      className=" rounded-lg p-3 flex items-center text-center relative space-x-2 gap-2"
                    >
                      {/* Poster with play overlay */}
                     <div
                        className="relative cursor-pointer  bg-black w-full"
                        onClick={() => {
                          if (isSelected) {
                            setSelectedSeason(null);
                          } else {
                            setSelectedSeason(season.season_number);
                            fetchSeasonEpisodes(season.season_number);
                          }
                        }}
                      >
                        {/* Poster with play overlay */}
                      <div className="flex space-x-4">
                        {/* Parent must have group */}
                        <div className="relative group">
                          <img
                            src={
                              season.poster_path
                                ? `${IMG_BASE}${season.poster_path}`
                                : "https://via.placeholder.com/150"
                            }
                            alt={season.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <div className="absolute inset-0 bg-black/50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                            <FaPlay className="text-white text-2xl" />
                          </div>
                        </div>

                        {/* Season details */}
                        <div className="text-left mt-3">
                          <p className="text-sm font-semibold">{season.name}</p>
                          <p className="text-sm font-semibold">Season: {season.season_number}</p>
                          <p className="text-xs text-gray-400">{season.episode_count} Episodes</p>
                        </div>
                      </div>


                        {/* Episodes list directly under image */}
                        {isSelected && (
                          <div className="mt-3 text-left">
                            <h3 className="text-sm text-gray-300 mb-2">Episodes</h3>

                            {loadingSeason === season.season_number ? (
                              <p className="text-gray-400 text-xs">Loading episodes...</p>
                            ) : season.episodes ? (
                              <ul className="space-y-1 text-xs text-gray-400">
                                {season.episodes.map((ep) => (
                                  <li
                                    key={ep.id}
                                    className="px-2 py-1 bg-black/50 rounded hover:bg-red-500 hover:text-white cursor-pointer transition"
                                  >
                                    Episode {ep.episode_number}: {ep.name}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-400 text-xs">Click to load episodes</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div className="px-6 py-6 space-y-2 bg-black/30 rounded-lg">
              <h2 className="text-sm text-gray-400">Description</h2>
              <p>{show.overview}</p>
            </div>

            {/* Cast Carousel */}
            <div className="px-6 py-6 space-y-2 bg-black/30 rounded-lg">
              <div className="flex justify-between items-center">
                <h2 className="text-sm text-gray-400">Cast</h2>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={prevCast}
                    className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    onClick={nextCast}
                    className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                  >
                    <FaChevronRight />
                  </button>
                </div>
              </div>
              <div className="flex space-x-2 overflow-hidden">
                {visibleCast?.map((actor) => (
                  <div key={actor.id}>
                    <img
                      src={
                        actor.profile_path
                          ? `${IMG_BASE}${actor.profile_path}`
                          : "https://via.placeholder.com/100"
                      }
                      alt={actor.name}
                      className="w-20 h-20 md:w-30 md:h-30 rounded-lg mx-auto"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="px-6 py-6 bg-black/30 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <button className="px-3 py-2 bg-red-500 rounded-lg text-sm hover:bg-red-600">
                  + Add Your Review
                </button>
              </div>

              {selectedReviews.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReviews
                      .slice(reviewIndex, reviewIndex + 2)
                      .map((rev) => {
                        const isExpanded = expandedReviews.includes(rev.id);
                        return (
                          <div
                            key={rev.id}
                            className="mb-4 p-4 bg-black rounded-lg h-fit"
                          >
                            <div className="lg:flex items-center justify-between">
                              <p className="font-semibold">{rev.author}</p>
                              <div className="flex items-center space-x-2 text-sm bg-gray-900 px-2 py-1 rounded-3xl border border-gray-700 w-fit">
                                {renderStars(
                                  rev.author_details?.rating || show.vote_average
                                )}
                                <span className="text-white">
                                  {rev.author_details?.rating ??
                                    show.vote_average.toFixed(1)}
                                </span>
                              </div>
                            </div>

                            <p className="text-gray-400 text-sm mt-2">
                              {isExpanded
                                ? rev.content
                                : rev.content.length > 200
                                ? `${rev.content.substring(0, 200)}...`
                                : rev.content}
                            </p>

                            {rev.content.length > 200 && (
                              <button
                                onClick={() => toggleReview(rev.id)}
                                className="text-red-500 text-sm mt-2 hover:underline"
                              >
                                {isExpanded ? "Show Less" : "Read More"}
                              </button>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  <div className="flex justify-center items-center mt-4 space-x-3">
                    <button
                      onClick={prevReviews}
                      disabled={reviewIndex === 0}
                      className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                    >
                      <FaChevronLeft />
                    </button>
                    <div className="flex space-x-2">
                      {Array.from({
                        length: Math.ceil(selectedReviews.length / 2),
                      }).map((_, i) => (
                        <span
                          key={i}
                          className={`w-3 h-1 rounded-full ${
                            i === reviewIndex / 2
                              ? "bg-red-500"
                              : "bg-gray-500"
                          }`}
                        ></span>
                      ))}
                    </div>
                    <button
                      onClick={nextReviews}
                      disabled={reviewIndex + 2 >= selectedReviews.length}
                      className="p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </>
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          </div>

          {/* Right Column (1/3) */}
          <div className="space-y-1 bg-black/30 rounded-lg h-fit">
            <div className="px-6 py-6">
              <h2 className="text-sm text-gray-400">First Air Year</h2>
              <p>{show.first_air_date?.split("-")[0] || "N/A"}</p>
            </div>

            <div className="px-6 py-6">
              <h2 className="text-sm text-gray-400">Languages</h2>
              <div className="flex flex-wrap gap-2">
                {show.spoken_languages.map((l) => (
                  <span
                    key={l.iso_639_1}
                    className="px-2 py-1 bg-black rounded-md text-sm"
                  >
                    {l.english_name}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-6">
              <h2 className="text-sm text-gray-400">Genres</h2>
              <div className="flex flex-wrap gap-2">
                {show.genres.map((g) => (
                  <span
                    key={g.id}
                    className="px-2 py-1 bg-black rounded-md text-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="px-6 py-6">
              <h2 className="text-sm text-gray-400">Rating</h2>
              <div className="px-3 py-2 bg-black w-fit rounded-md space-y-2">
                <span className="text-xs">TMDB</span>
                <div className="flex items-center space-x-2">
                  {renderStars(show.vote_average)}
                  <span className="text-sm">
                    {show.vote_average.toFixed(1)}
                  </span>
                  </div>
                </div>
              </div>
    
               {director && (
                <div className="px-6 py-6  rounded-lg">
                    <h2 className="text-sm text-gray-400">Director</h2>
                    <div className="flex items-center space-x-3 mt-2 px-2 py-1 bg-black rounded-md text-sm ">
                    <img
                        src={
                        director.profile_path
                            ? `${IMG_BASE}${director.profile_path}`
                            : "https://via.placeholder.com/50"
                        }
                        alt={director.name}
                        className="w-12 h-12 rounded-lg"
                    />
                    <p>{director.name}</p>
                    </div>
                </div>
                )}

                {musicDirector && (
                <div className="px-6 py-6  rounded-lg">
                    <h2 className="text-sm text-gray-400">Music Director</h2>
                    <div className="flex items-center space-x-3 mt-2 px-2 py-1 bg-black rounded-md text-sm">
                    <img
                        src={
                        musicDirector.profile_path
                            ? `${IMG_BASE}${musicDirector.profile_path}`
                            : "https://via.placeholder.com/50"
                        }
                        alt={musicDirector.name}
                        className="w-12 h-12 rounded-lg object-cover"
                    />
                    <p>{musicDirector.name}</p>
                    </div>
                </div>
                )}
            </div>
          </div> 
      </div>
   
      <TrialBG />
      <Footer />
    </div>
  );
}           

export default ShowViewPage;
