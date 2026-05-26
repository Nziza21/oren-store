import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, total } = useCart()
  const navigate = useNavigate()

  if (cart.length === 0) return (
    <div className="page-wrapper">
      <Nav />
      <div className="cart-empty">
        <h2 className="cart-empty-title">Your cart is empty</h2>
        <p className="cart-empty-sub">Looks like you haven't added anything yet.</p>
        <button className="btn-primary" onClick={() => navigate('/shop')}>
          Shop Now
        </button>
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="page-wrapper">
      <Nav />
      <div className="cart-page">
        <div className="cart-left">
          <div className="shop-header">
            <div className="section-label">Review</div>
            <h1 className="shop-title">Your Cart</h1>
          </div>

          <div className="cart-items">
            {cart.map((item, i) => (
              <div key={i} className="cart-item">
                <div className="cart-item-img">
                  <span className="placeholder-text">Photo</span>
                </div>
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-size">Size: {item.size}</div>
                  <div className="cart-item-price">{item.price.toLocaleString()} RWF</div>
                </div>
                <div className="cart-item-right">
                  <div className="cart-item-qty">x{item.quantity}</div>
                  <button
                    className="cart-remove"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="cart-right">
          <div className="cart-summary">
            <div className="section-label">Summary</div>
            <h2 className="cart-summary-title">Order Total</h2>

            <div className="cart-summary-rows">
              {cart.map((item, i) => (
                <div key={i} className="summary-row">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>{(item.price * item.quantity).toLocaleString()} RWF</span>
                </div>
              ))}
            </div>

            <div className="cart-total-row">
              <span>Total</span>
              <span>{total.toLocaleString()} RWF</span>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '16px', marginTop: '1.5rem' }}
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout
            </button>

            <button
              className="btn-ghost"
              style={{ width: '100%', padding: '14px', marginTop: '0.75rem' }}
              onClick={() => navigate('/shop')}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cart