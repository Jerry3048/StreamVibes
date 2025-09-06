import { BrowserRouter as Router, Routes, Route } from "react-router";

// ✅ Example pages (you can replace with your real components)
import Home from "./pages/Home";
import GenrePage from "./pages/GenrePage.tsx";

// import Movies from "./pages/Movies";
// import Subscription from "./pages/Subscription";
// import Support from "./pages/Support";

export default function App() {
  return (
    <Router>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/genre/:genreId" element={<GenrePage />} />
        {/* <Route path="/movies" element={<Movies />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/support" element={<Support />} /> */}
      </Routes>
    </Router>
  );
}