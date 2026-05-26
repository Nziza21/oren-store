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
            <div className="story-tag">Our Story</div>
            <h1 className="our-story-title">The Same Brand.<br /><em>Elevated.</em></h1>
          </div>
          <div className="our-story-hero-img">
            <span className="placeholder-text">Campaign Photo</span>
          </div>
        </div>

        <div className="our-story-body">
          <div className="our-story-section">
            <div className="story-tag">Where It Started</div>
            <p>What started as a quick online store became something we actually believed in. We were selling t-shirts — blanks and printed ones — and people were buying. The audience grew, the orders came in, and somewhere in the middle of all that we realized this wasn't just a side hustle. People were wearing what we made and carrying it with confidence. That meant something.</p>
          </div>

          <div className="our-story-section">
            <div className="story-tag">The Shift</div>
            <p>So we stopped. We took the time to ask what this brand actually was. Not what it was selling, but what it stood for. The answer was simple: refinement without excess. Pieces that feel intentional. Clothes that don't chase trends because they don't need to. That's when ORÉN was born — not as a rebrand, but as a commitment to do this properly.</p>
          </div>

          <div className="our-story-section">
            <div className="story-tag">What ORÉN Is</div>
            <p>ORÉN is elevated basics, tailored African shirts and matching pants, and handcrafted leather sandals. Everything is chosen with care. Everything carries the logo quietly. Nothing screams. You don't need excess to be memorable — and every piece we make is built around that belief.</p>
          </div>

          <div className="our-story-founder-cta">
            <p>"You give the name meaning. The name doesn't give meaning to you."</p>
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