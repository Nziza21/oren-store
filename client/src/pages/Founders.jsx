import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Founders = () => {
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">
      <Nav />

      <div className="founders-page">

        <div className="founders-hero">
          <div className="founders-hero-img">
            <span className="placeholder-text">Your Photo</span>
          </div>
          <div className="founders-hero-text">
            <div className="story-tag">The Founder</div>
            <h1 className="founders-title">Nziza Samuel</h1>
            <p className="founders-role">Software Engineer & Creator of ORÉN</p>
            <p className="founders-bio">
              I'm a software developer currently pursuing a degree in Software Engineering at African Leadership University. I build things in production — real systems, real products, real impact. ORÉN is what happens when that same mindset meets a love for design, identity, and the way clothes make people feel.
            </p>
            <p className="founders-bio">
              I didn't set out to start a clothing brand. I set out to build something I actually believed in. My sister and I had a store that worked — people bought, people wore it, people came back. But we were treating it casually, and I knew it deserved more. So I built the website myself, designed the brand identity, chose every piece with intention, and launched ORÉN properly.
            </p>
            <p className="founders-bio">
              I lead when it's needed, ask questions when clarity is missing, and take ownership because that's the only way anything actually gets done. ORÉN is that philosophy wearing clothes.
            </p>
            <button
              className="btn-ghost"
              style={{ marginTop: '1rem', alignSelf: 'flex-start' }}
              onClick={() => navigate('/our-story')}
            >
              Read Our Story
            </button>
          </div>
        </div>

        <div className="founders-philosophy">
          <div className="founders-philosophy-inner">
            <div className="story-tag">The Belief</div>
            <h2 className="founders-philosophy-title">
              "You don't need excess<br />to be <em>memorable.</em>"
            </h2>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Founders