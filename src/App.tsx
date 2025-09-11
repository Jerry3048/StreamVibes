import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage.tsx";
import MovieShows from "./pages/MovieShows"; 
// import MoviePage from "./pages/MoviePage";     // Create this component
// import ShowPage from "./pages/ShowPage";       // Create this component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
        <Route path="/movies-shows" element={<MovieShows />} />
        {/* <Route path="/movies/:movieId" element={<MoviePage />} />
        <Route path="/shows/:showId" element={<ShowPage />} /> */}
      </Routes>
    </Router>
  );
}