const Marquee = () => {
  const items = [
    'T-Shirts', 'African Shirts', 'Matching Sets',
    'Leather Sandals', 'Kigali Made', 'Timeless Design',
    'T-Shirts', 'African Shirts', 'Matching Sets',
    'Leather Sandals', 'Kigali Made', 'Timeless Design',
  ]

  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {items.map((item, i) => (
          <span key={i} className="marquee-item">
            {item} <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default Marquee