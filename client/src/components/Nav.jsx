import { useCart } from '../context/CartContext'
import { Link } from 'react-router-dom'
import logo from '../assets/oren-logo.png'

const Nav = () => {
  const { count } = useCart()

  return (
    <nav className="nav">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo} alt="ORÉN" className="nav-logo-img" />
        </Link>
      </div>
      <ul className="nav-links">
  <li><Link to="/shop">Shop</Link></li>
  <li><Link to="/collections">Collections</Link></li>
  <li><Link to="/our-story">Our Story</Link></li>
</ul>
      <div className="nav-right">
        <Link to="/cart">
          <button className="cart-btn">Cart ({count})</button>
        </Link>
      </div>
    </nav>
  )
}

export default Nav