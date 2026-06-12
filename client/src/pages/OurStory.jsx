import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const OurStory = () => {
  const navigate = useNavigate()

  return (
    <div className="page-wrapper">
      <Nav />

      <div className="our-story-page">

        <div className="our-story-hero">
          <div className="our-story-hero-text">
            <div className="story-tag">The Philosophy</div>
            <h1 className="our-story-title">The Art of<br /><em>Becoming.</em></h1>
          </div>
          <div className="our-story-hero-img">
            <span className="placeholder-text">Campaign Photo</span>
          </div>
        </div>

        <div className="our-story-body">
          <div className="our-story-section">
            <div className="story-tag">The Name</div>
            <p>ORÉN is derived from the ancient Hebrew word oren — meaning pine tree. The pine does not rush its growth. It deepens its roots through harsh winters, stands steadfast through changing winds, and builds its strength layer by layer, season by season. Every ring inside that tree is a record of everything it has survived and everything it has become.</p>
          </div>

          <div className="our-story-section">
            <div className="story-tag">The Accent</div>
            <p>The É is not decoration. The sharp accent mark over the É was designed deliberately — it mirrors the shape of a pine needle, anchoring the name to its origin. And if you look closely, it points upward. A subtle, quiet nod to the only direction that matters: forward. Upward. Becoming.</p>
          </div>

          <div className="our-story-section">
            <div className="story-tag">The Belief</div>
            <p>We do not arrive finished. To be human is to exist in a state of constant, deliberate evolution. We move through the seasons of our lives — from the student finding footing, to the employee mastering a craft, to the visionary building a legacy. We transition from uncertainty to quiet confidence, from fear to resilience. We are always becoming.</p>
          </div>

          <div className="our-story-section">
            <div className="story-tag">The Clothing</div>
            <p>Fashion is the physical uniform of our evolution. Every time a human being steps into a new phase of life, the very first thing they change is how they dress. ORÉN is designed specifically to be the uniform for those transitions. Not loud. Not trend-chasing. Not trying too hard. Crafted with architectural precision, uncompromising textures, and an understated silhouette — each piece speaks in a whisper. It does not shout for attention. It commands respect through pure substance and impeccable taste.</p>
          </div>

          <div className="our-story-section">
            <div className="story-tag">The Collection</div>
            <p>Seasons of the Self is our debut. Five pieces. Each named for a stage of the journey. Each built to age with you, to wear in beautifully over time — getting better as you get better. This is not fashion. This is an anchor for the journey.</p>
          </div>

          <div className="our-story-founder-cta">
            <p>"You are an unwritten sentence. An ongoing story. ORÉN: The Art of Becoming."</p>
            <button
              className="btn-ghost"
              onClick={() => navigate('/founders')}
            >
              Meet the Person Behind It
            </button>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default OurStory