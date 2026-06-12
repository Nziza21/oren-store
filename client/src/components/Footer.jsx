import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <span className="footer-logo">ORÉN</span>
          <p>The Art of Becoming.<br />Kigali, Rwanda.</p>
        </div>
        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/collections">The Collection</Link></li>
            <li><Link to="/shop">All Pieces</Link></li>
            <li><Link to="/collections">Seasons of the Self</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Info</h4>
          <ul>
            <li><Link to="/our-story">Our Philosophy</Link></li>
            <li><Link to="/founders">The Founder</Link></li>
            <li><Link to="/track">Track Order</Link></li>
            <li><a href="#">Sizing Guide</a></li>
            <li><a href="#">Shipping</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Connect</h4>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">TikTok</a>  </li>
            <li><a href="#">WhatsApp</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 ORÉN Rwanda Ltd. Kigali, Rwanda.</span>
        <div className="footer-pay">
          <span className="pay-badge">MTN MoMo</span>
          <span className="pay-badge">Visa</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer