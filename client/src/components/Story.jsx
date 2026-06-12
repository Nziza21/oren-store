import { useNavigate } from 'react-router-dom'

const Story = () => {
  const navigate = useNavigate()

  return (
    <section className="story">
      <div className="story-img">
        <span className="placeholder-text" style={{ color: 'var(--warm)' }}>Campaign Photo</span>
      </div>
      <div className="story-content">
        <div className="story-tag">The Philosophy</div>
        <h2 className="story-title">
          We Do Not<br />Arrive <em>Finished.</em>
        </h2>
        <p className="story-body">
          ORÉN is derived from the ancient Hebrew word for pine tree — a symbol of resilience, longevity, and endurance. Like the tree that grows stronger through every harsh winter, we believe human beings are in a constant state of deliberate evolution. We are always becoming. This clothing is built for that journey.
        </p>
        <button
          className="btn-ghost"
          style={{ borderColor: 'var(--warm)', color: 'var(--warm)' }}
          onClick={() => navigate('/our-story')}
        >
          Our Philosophy
        </button>
      </div>
    </section>
  )
}

export default Story