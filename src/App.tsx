import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage";
import MovieShows from "./pages/Movie-ShowsPage";
import MovieViewPage from "./pages/MovieViewPage";
import ShowViewPage from "./pages/ShowViewPage";
import SupportPage from "./pages/SupportPage";

export default function App() {
  return (
    <Router>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:type/:genreId" element={<GenrePage />} />
        <Route path="/movies-shows" element={<MovieShows />} />
        <Route path="/movie/:movieName" element={<MovieViewPage />} />
        <Route path="/tv/:showName" element={<ShowViewPage />} />
        <Route path="/support" element={<SupportPage />} />
      </Routes>

    </Router>
  );
}
