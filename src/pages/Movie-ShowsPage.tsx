import Header from "../components/Header"
import Watch from "../components/Watch"
import GenreSection from "../components/GenreSection"
import Movies from "../components/Movies"
function MovieShows() {
  return (
    <div className="space-y-8">
      <Header />
      <Watch />
      <GenreSection />
      <Movies />

    </div>
  )
}

export default MovieShows