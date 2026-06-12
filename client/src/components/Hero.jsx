import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-tag">Debut Collection — Seasons of the Self</div>
        <h1 className="hero-title">
          The Art of<br /><em>Becoming.</em>
        </h1>
        <p className="hero-sub">
          We do not arrive finished. Clothing for the deliberate evolution — built for the man who is always arriving.
        </p>
        <p className="hero-philosophy">
          "Like the pine tree that stands steadfast through changing seasons, we are always becoming."
        </p>
        <div className="hero-actions">
          <Link to="/collections" className="btn-primary">The Collection</Link>
          <Link to="/our-story" className="btn-ghost">Our Philosophy</Link>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-img-placeholder">
          <span className="placeholder-text">Campaign Shoot</span>
        </div>
      </div>
    </section>
  )
}

export default Hero