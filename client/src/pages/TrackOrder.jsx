import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Toast from '../components/Toast'

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('')
  const [toast, setToast] = useState('')
  const navigate = useNavigate()

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleTrack = () => {
    if (!orderNumber.trim()) return showToast('Please enter your order number')
    navigate(`/order/${orderNumber.trim().toUpperCase()}`)
  }

  return (
    <div className="page-wrapper">
      <Nav />
      <Toast message={toast} />
      <div className="track-page">
        <div className="track-box">
          <div className="section-label">Order Tracking</div>
          <h1 className="track-title">Track Your Order</h1>
          <p className="track-sub">Enter your order number to see the current status of your delivery.</p>
          <div className="track-form">
            <input
              className="form-input"
              placeholder="e.g. OREN-123456-789"
              value={orderNumber}
              onChange={e => setOrderNumber(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleTrack()}
            />
            <button className="btn-primary" style={{ padding: '14px 32px' }} onClick={handleTrack}>
              Track
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default TrackOrder