import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import { useCart } from '../context/CartContext'

const Checkout = () => {
  const { cart, total, clearCart } = useCart()
  const navigate = useNavigate()
  const [toast, setToast] = useState('')
  const [loading, setLoading] = useState(false)
  const orderPlaced = useRef(false)
  const [form, setForm] = useState({
    customer_name: '',
    customer_phone: '',
    delivery_address: '',
    neighborhood: '',
    delivery_notes: ''
  })

  useEffect(() => {
    if (cart.length === 0 && !orderPlaced.current) {
      navigate('/shop')
    }
  }, [cart])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    if (!form.customer_name) return showToast('Please enter your name')
    if (!form.customer_phone) return showToast('Please enter your phone number')
    if (!form.delivery_address) return showToast('Please enter your delivery address')
    if (!form.neighborhood) return showToast('Please enter your neighborhood')

    setLoading(true)
    try {
      const order = await axios.post('http://localhost:5000/api/orders', {
        ...form,
        items: cart,
        total
      })

      orderPlaced.current = true
      clearCart()
      navigate(`/order/${order.data.order_number}`)
    } catch (err) {
      showToast('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      <Nav />
      <Toast message={toast} />
      <div className="checkout-page">

        <div className="checkout-left">
          <div className="shop-header">
            <div className="section-label">Almost There</div>
            <h1 className="shop-title">Your Details</h1>
          </div>

          <div className="checkout-form">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                className="form-input"
                name="customer_name"
                placeholder="Your full name"
                value={form.customer_name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">MTN MoMo Phone Number</label>
              <input
                className="form-input"
                name="customer_phone"
                placeholder="07XXXXXXXX"
                value={form.customer_phone}
                onChange={handleChange}
              />
              <span className="form-hint">You'll receive a payment request on this number</span>
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Address</label>
              <input
                className="form-input"
                name="delivery_address"
                placeholder="Street, building, or landmark"
                value={form.delivery_address}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Neighborhood / Sector</label>
              <input
                className="form-input"
                name="neighborhood"
                placeholder="e.g. Kimironko, Kacyiru, Nyamirambo"
                value={form.neighborhood}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Delivery Notes <span className="form-optional">(optional)</span></label>
              <textarea
                className="form-input form-textarea"
                name="delivery_notes"
                placeholder="Any instructions for delivery — gate code, call when arriving, etc."
                value={form.delivery_notes}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="checkout-right">
          <div className="cart-summary">
            <div className="section-label">Your Order</div>
            <h2 className="cart-summary-title">Order Summary</h2>

            <div className="cart-summary-rows">
              {cart.map((item, i) => (
                <div key={i} className="summary-row">
                  <span>{item.name} — {item.size} (x{item.quantity})</span>
                  <span>{(item.price * item.quantity).toLocaleString()} RWF</span>
                </div>
              ))}
            </div>

            <div className="cart-total-row">
              <span>Total</span>
              <span>{total.toLocaleString()} RWF</span>
            </div>

            <div className="checkout-momo">
              <div className="momo-label">Payment via</div>
              <div className="momo-badge">MTN MoMo</div>
              <p className="momo-info">After placing your order you'll receive a push notification on your MTN number to approve the payment.</p>
            </div>

            <button
              className="btn-primary"
              style={{ width: '100%', padding: '16px', marginTop: '1.5rem' }}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order & Pay'}
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Checkout