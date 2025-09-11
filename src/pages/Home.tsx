import Movies from "../components/Movies"
import Background from "../components/Background"
import GenresSection from "../components/GenreSection"
import SupportedDevices from "../components/SupportedDevices"
import FAQSection from "../components/FAQSection"
import Pricing from "../components/price"
import TrialBG from "../components/TrialBG"
import Footer from "../components/Footer"
function Home() {
  return (
    <div className="space-y-30">
      <Background />
      <GenresSection />
      <SupportedDevices />
      <FAQSection />
      <Pricing />
      <TrialBG />
      <Movies />
      <Footer />
    </div>
  )
}

export default Home