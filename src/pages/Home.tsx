import Movies from "../components/Movies"
import Background from "../components/Background"
import GenresSection from "../components/GenreSection"

function Home() {
  return (
    <div>
      <Background />
      <GenresSection />
      <Movies />
    </div>
  )
}

export default Home