const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-tag">New Collection 2026</div>
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
          <a href="/shop" class="btn-primary">Shop Now</a>
          <a href="http://localhost:5173/our-story" class="btn-ghost">Our Story</a>
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