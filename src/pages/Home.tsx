import Background from "../components/Background"
import { MovieGenresSection } from "../components/GenreSection"
import SupportedDevices from "../components/SupportedDevices"
import FAQSection from "../components/FAQSection"
import Pricing from "../components/price"
import TrialBG from "../components/TrialBG"
import Footer from "../components/Footer"
function Home() {
  return (
    <div className="space-y-30">
      <Background />
      <MovieGenresSection />
      <SupportedDevices />
      <FAQSection />
      <Pricing />
      <TrialBG />
      <Footer />
    </div>
  )
}

export default Home