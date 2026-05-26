import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import ProductGrid from '../components/ProductGrid'
import Story from '../components/Story'

const Home = () => {
  return (
    <div>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <ProductGrid />
        <Story />
      </main>
    </div>
  )
}

export default Home