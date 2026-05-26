import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import ProductGrid from '../components/ProductGrid'

const Home = () => {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ProductGrid />
      </main>
    </div>
  )
}

export default Home