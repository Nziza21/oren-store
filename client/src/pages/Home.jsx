import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'

const Home = () => {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
      </main>
    </div>
  )
}

export default Home