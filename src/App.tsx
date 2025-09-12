import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage.tsx";
import MovieShows from "./pages/Movie-ShowsPage.tsx"; 
import MovieViewPage from "./pages/MovieViewPage";     // Create this component
// import ShowPage from "./pages/ShowPage";       // Create this component

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/genre/:type/:genreId" element={<GenrePage />} />
        <Route path="/movies-shows" element={<MovieShows />} />
        <Route path="/movies/:movieId" element={<MovieViewPage />} />
        {/* <Route path="/shows/:showId" element={<ShowPage />} /> */}
      </Routes>
    </Router>
  );
}