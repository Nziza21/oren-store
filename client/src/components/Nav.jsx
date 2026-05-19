import { useCart } from '../context/CartContext'
import logo from '../assets/oren-logo.png'

const Nav = () => {
  const { count } = useCart()

  return (
    <nav className="nav">
      <div className="nav-logo">
        <img src={logo} alt="ORÉN" className="nav-logo-img" />
      </div>
      <ul className="nav-links">
        <li><a href="#">Shop</a></li>
        <li><a href="#">Collections</a></li>
        <li><a href="#">Our Story</a></li>
      </ul>
      <div className="nav-right">
        <button className="cart-btn">Cart ({count})</button>
      </div>
    </nav>
  )
}

export default Nav