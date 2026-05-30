import { useState, useEffect } from 'react'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const statusLabels = {
  received: 'Order Received',
  assembling: 'Being Assembled',
  on_the_way: 'On the Way',
  delivered: 'Delivered'
}

const statusColors = {
  received: '#8B6F47',
  assembling: '#C9B99A',
  on_the_way: '#7A6A55',
  delivered: '#3D3028'
}

const Admin = () => {
  const [orders, setOrders] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/orders')
    setOrders(res.data)
  }

  const updateStatus = async (order_number, status) => {
    setLoading(true)
    try {
      await axios.patch(`http://localhost:5000/api/orders/${order_number}/status`, { status })
      await fetchOrders()
      if (selected?.order_number === order_number) {
        setSelected(prev => ({ ...prev, status }))
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-wrapper">
      <Nav />
      <div className="admin-page">
        <div className="shop-header">
          <div className="section-label">Dashboard</div>
          <h1 className="shop-title">ORÉN Orders</h1>
        </div>

        <div className="admin-grid">
          <div className="admin-list">
            {orders.length === 0 && (
              <p style={{ color: 'var(--bark)', fontSize: '0.85rem' }}>No orders yet.</p>
            )}
            {orders.map(order => (
              <div
                key={order.order_number}
                className={`admin-order-card ${selected?.order_number === order.order_number ? 'active' : ''}`}
                onClick={() => setSelected(order)}
              >
                <div className="admin-order-top">
                  <span className="admin-order-number">{order.order_number}</span>
                  <span
                    className="admin-order-status"
                    style={{ color: statusColors[order.status] }}
                  >
                    {statusLabels[order.status]}
                  </span>
                </div>
                <div className="admin-order-name">{order.customer_name}</div>
                <div className="admin-order-meta">
                  <span>{order.neighborhood}</span>
                  <span>{order.total.toLocaleString()} RWF</span>
                </div>
                <div className="admin-order-date">
                  {new Date(order.created_at).toLocaleDateString('en-RW', {
                    day: 'numeric', month: 'short', year: 'numeric',
                    hour: '2-digit', minute: '2-digit'
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="admin-detail">
            {!selected ? (
              <div className="admin-empty">
                <p>Select an order to view details</p>
              </div>
            ) : (
              <div>
                <div className="admin-detail-header">
                  <h2 className="admin-detail-title">{selected.order_number}</h2>
                  <span
                    className="admin-order-status"
                    style={{ color: statusColors[selected.status] }}
                  >
                    {statusLabels[selected.status]}
                  </span>
                </div>

                <div className="admin-section">
                  <div className="section-label" style={{ marginBottom: '0.75rem' }}>Customer</div>
                  <div className="delivery-row"><span>Name</span><span>{selected.customer_name}</span></div>
                  <div className="delivery-row"><span>Phone</span><span>{selected.customer_phone}</span></div>
                  <div className="delivery-row"><span>Address</span><span>{selected.delivery_address}</span></div>
                  <div className="delivery-row"><span>Neighborhood</span><span>{selected.neighborhood}</span></div>
                  {selected.delivery_notes && (
                    <div className="delivery-row"><span>Notes</span><span>{selected.delivery_notes}</span></div>
                  )}
                  <div className="delivery-row">
                    <span>Payment</span>
                    <span style={{ color: selected.payment_status === 'paid' ? 'var(--accent)' : 'var(--warm)' }}>
                      {selected.payment_status}
                    </span>
                  </div>
                </div>

                <div className="admin-section">
                  <div className="section-label" style={{ marginBottom: '0.75rem' }}>Items</div>
                  {selected.items.map((item, i) => (
                    <div key={i} className="delivery-row">
                      <span>{item.name} — {item.size} (x{item.quantity})</span>
                      <span>{(item.price * item.quantity).toLocaleString()} RWF</span>
                    </div>
                  ))}
                  <div className="cart-total-row" style={{ marginTop: '0.75rem' }}>
                    <span>Total</span>
                    <span>{selected.total.toLocaleString()} RWF</span>
                  </div>
                </div>

                <div className="admin-section">
                  <div className="section-label" style={{ marginBottom: '0.75rem' }}>Update Status</div>
                  <div className="admin-status-btns">
                    {Object.entries(statusLabels).map(([key, label]) => (
                      <button
                        key={key}
                        className={`admin-status-btn ${selected.status === key ? 'active' : ''}`}
                        onClick={() => updateStatus(selected.order_number, key)}
                        disabled={loading}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Admin