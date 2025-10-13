import Hero from "../components/Hero"
import LatestCollection from "../components/LatestCollection"
import BestSaler from "../components/BestSaler"
import OurPolicy from "../components/OurPolicy"
import NewsLetterBox from "../components/NewsLetterBox"
const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSaler />
      <OurPolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home