const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">ORÉN</span>
          <p>Made in Kigali. Built to last.<br />Worn by people who know what they want.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">T-Shirts</a></li>
            <li><a href="#">African Shirts</a></li>
            <li><a href="#">Matching Sets</a></li>
            <li><a href="#">Sandals</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Info</h4>
          <ul>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Sizing Guide</a></li>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a></li>
            <li><a href="#">WhatsApp</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2025 ORÉN. Kigali, Rwanda.</span>
        <div className="footer-pay">
          <span className="pay-badge">MTN MoMo</span>
          <span className="pay-badge">Visa</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer