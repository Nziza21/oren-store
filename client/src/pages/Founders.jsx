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
              I am a software engineer currently pursuing a degree at African Leadership University. I build things in production — real systems, real products, real impact. I have always been driven by creative ideas I can actually execute, and studying what I study makes those dreams feel real every single day.
            </p>
            <p className="founders-bio">
              ORÉN is my own season of becoming. I started selling clothes with my sister because we saw an opportunity and we took it. People bought, people wore it, people came back. But somewhere along the way I realized we were treating something seriously as if it were casual. So I stopped. I studied the philosophy, designed the identity, built the website myself, sourced every detail of every piece personally, and launched ORÉN properly — as a registered business, with a vision, with intention.
            </p>
            <p className="founders-bio">
              I lead when it is needed. I ask questions when clarity is missing. I take ownership because that is the only way anything actually gets done. ORÉN is that philosophy wearing clothes. I am not finished. I am becoming. And everything I build reflects that.
            </p>
            <button
              className="btn-ghost"
              style={{ marginTop: '1rem', alignSelf: 'flex-start' }}
              onClick={() => navigate('/our-story')}
            >
              Read Our Philosophy
            </button>
          </div>
        </div>

        <div className="founders-philosophy">
          <div className="founders-philosophy-inner">
            <div className="story-tag">The Belief</div>
            <h2 className="founders-philosophy-title">
              "We do not arrive finished.<br /><em>We are always becoming.</em>"
            </h2>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Founders