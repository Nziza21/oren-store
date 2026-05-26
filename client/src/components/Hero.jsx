const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-tag">New Collection 2025</div>
        <h1 className="hero-title">
          Wear What<br />You <em>Actually</em><br />Are
        </h1>
        <p className="hero-sub">
          Elevated basics, tailored African pieces, and handcrafted leather. Built for people who don't need to follow trends.
        </p>
        <p className="hero-philosophy">
          "You don't need excess to be memorable."
        </p>
        <div className="hero-actions">
          <button className="btn-primary">Shop Now</button>
          <button className="btn-ghost">Our Story</button>
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