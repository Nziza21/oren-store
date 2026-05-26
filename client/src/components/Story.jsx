const Story = () => {
  return (
    <section className="story">
      <div className="story-img">
        <span className="placeholder-text" style={{ color: 'var(--warm)' }}>Campaign Video / Photo</span>
      </div>
      <div className="story-content">
        <div className="story-tag">Our Story</div>
        <h2 className="story-title">
          The Same Brand.<br /><em>Elevated.</em>
        </h2>
        <p className="story-body">
          What started as a quick store became something we actually believed in. We watched people wear what we made and carry it with confidence — and we knew we couldn't keep treating it casually. This is the same brand you knew. Just taken seriously. New name, new identity, same faces, same love — but now built to last.
        </p>
        <button className="btn-ghost" style={{ borderColor: 'var(--warm)', color: 'var(--warm)' }}>
          Read More
        </button>
      </div>
    </section>
  )
}

export default Story