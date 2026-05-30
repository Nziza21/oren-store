import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const statusSteps = [
  { key: 'received', label: 'Order Received' },
  { key: 'assembling', label: 'Being Assembled' },
  { key: 'on_the_way', label: 'On the Way' },
  { key: 'delivered', label: 'Delivered' },
]

const OrderConfirmation = () => {
  const { order_number } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/${order_number}`)
      .then(res => setOrder(res.data))
  }, [order_number])

  useEffect(() => {
    if (!order) return
    if (order.payment_status === 'paid') return

    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/orders/${order_number}/payment-status`)
        if (res.data.payment_status === 'paid') {
          setOrder(prev => ({ ...prev, payment_status: 'paid', status: 'received' }))
          clearInterval(interval)
        } else if (res.data.payment_status === 'failed') {
          setOrder(prev => ({ ...prev, payment_status: 'failed' }))
          clearInterval(interval)
        }
      } catch (err) {
        console.error(err)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [order])

  if (!order) return (
    <div>
      <Nav />
      <div className="product-loading">Loading your order...</div>
    </div>
  )

  const currentStep = statusSteps.findIndex(s => s.key === order.status)

  return (
    <div className="page-wrapper">
      <Nav />
      <div className="confirmation-page">

        <div className="confirmation-header">
          <div className="story-tag">Thank You</div>
          <h1 className="confirmation-title">Order Placed.</h1>
          <p className="confirmation-subtitle">
            You'll receive a MoMo payment request shortly. Approve it to confirm your order.
          </p>
          <div className="confirmation-number">
            Order <span>{order.order_number}</span>
          </div>
          <div className={`payment-status ${order.payment_status}`}>
            {order.payment_status === 'paid' ? '✓ Payment Confirmed' :
             order.payment_status === 'failed' ? '✗ Payment Failed' :
             '⏳ Waiting for Payment Approval...'}
          </div>
        </div>

        <div className="confirmation-body">
          <div className="confirmation-left">
            <div className="section-label">Order Status</div>
            <div className="status-tracker">
              {statusSteps.map((step, i) => (
                <div key={step.key} className={`status-step ${i <= currentStep ? 'active' : ''} ${i === currentStep ? 'current' : ''}`}>
                  <div className="status-dot"></div>
                  {i < statusSteps.length - 1 && <div className="status-line"></div>}
                  <div className="status-label">{step.label}</div>
                </div>
              ))}
            </div>

            <div className="confirmation-delivery">
              <div className="section-label" style={{ marginBottom: '1rem' }}>Delivery Details</div>
              <div className="delivery-row">
                <span>Name</span>
                <span>{order.customer_name}</span>
              </div>
              <div className="delivery-row">
                <span>Phone</span>
                <span>{order.customer_phone}</span>
              </div>
              <div className="delivery-row">
                <span>Address</span>
                <span>{order.delivery_address}</span>
              </div>
              <div className="delivery-row">
                <span>Neighborhood</span>
                <span>{order.neighborhood}</span>
              </div>
              {order.delivery_notes && (
                <div className="delivery-row">
                  <span>Notes</span>
                  <span>{order.delivery_notes}</span>
                </div>
              )}
            </div>
          </div>

          <div className="confirmation-right">
            <div className="cart-summary">
              <div className="section-label">Your Items</div>
              <h2 className="cart-summary-title">Order Summary</h2>
              <div className="cart-summary-rows">
                {order.items.map((item, i) => (
                  <div key={i} className="summary-row">
                    <span>{item.name} — {item.size} (x{item.quantity})</span>
                    <span>{(item.price * item.quantity).toLocaleString()} RWF</span>
                  </div>
                ))}
              </div>
              <div className="cart-total-row">
                <span>Total</span>
                <span>{order.total.toLocaleString()} RWF</span>
              </div>
            </div>

            <button
              className="btn-ghost"
              style={{ width: '100%', padding: '14px', marginTop: '1rem' }}
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

export default OrderConfirmation