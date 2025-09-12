import Header from "../components/Header"
import Watch from "../components/Watch"
import GenreSection from "../components/GenreSection"
import Movies from "../components/MoviesCategory"
import TrialBG from "../components/TrialBG"
import Footer from "../components/Footer"
function MovieShows() {
  return (
    <div className="">
      <Header />
      <Watch />
      <div className="space-y-10 mt-10">
        <GenreSection />
        <Movies />
        <TrialBG />
        <Footer />
      </div>
    </div>
  )
}

export default MovieShows