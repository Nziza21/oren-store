const Marquee = () => {
  const items = [
    'Seasons of the Self', 'Debut Collection', 'The Art of Becoming',
    'Crafted with Intention', 'ORÉN', 'Always Becoming',
    'Seasons of the Self', 'Debut Collection', 'The Art of Becoming',
    'Crafted with Intention', 'ORÉN', 'Always Becoming',
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