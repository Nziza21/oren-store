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

const emptyProduct = {
  name: '', description: '', price: '', category: 'tshirts',
  sizes: '', stock: '', badge: ''
}

const Admin = () => {
  const [tab, setTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [productForm, setProductForm] = useState(emptyProduct)
  const [editingProduct, setEditingProduct] = useState(null)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (authenticated) {
      fetchOrders()
      fetchProducts()
    }
  }, [authenticated])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleLogin = () => {
    if (password === 'oren-admin-2026') {
      setAuthenticated(true)
    } else {
      alert('Wrong password')
    }
  }

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/orders')
    setOrders(res.data)
  }

  const fetchProducts = async () => {
    const res = await axios.get('http://localhost:5000/api/products')
    setProducts(res.data)
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

  const handleProductChange = (e) => {
    setProductForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleProductSubmit = async () => {
    if (!productForm.name || !productForm.price || !productForm.sizes) {
      return showToast('Name, price and sizes are required')
    }
    setLoading(true)
    try {
      const payload = {
        ...productForm,
        price: parseInt(productForm.price),
        stock: parseInt(productForm.stock) || 0,
        sizes: productForm.sizes.split(',').map(s => s.trim())
      }

      if (editingProduct) {
        await axios.put(`http://localhost:5000/api/products/${editingProduct.id}`, payload)
        showToast('Product updated')
      } else {
        await axios.post('http://localhost:5000/api/products', payload)
        showToast('Product added')
      }

      setProductForm(emptyProduct)
      setEditingProduct(null)
      await fetchProducts()
    } catch (err) {
      showToast('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      category: product.category,
      sizes: product.sizes.join(', '),
      stock: product.stock.toString(),
      badge: product.badge || ''
    })
    window.scrollTo(0, 0)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`)
      showToast('Product deleted')
      await fetchProducts()
    } catch (err) {
      showToast('Something went wrong')
    }
  }

  if (!authenticated) {
    return (
      <div className="page-wrapper">
        <Nav />
        <div className="admin-login">
          <div className="admin-login-box">
            <div className="section-label">Admin Access</div>
            <h2 className="admin-login-title">ORÉN Dashboard</h2>
            <input
              className="form-input"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
            <button
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
              onClick={handleLogin}
            >
              Enter
            </button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="page-wrapper">
      <Nav />
      {toast && <div className="toast">{toast}</div>}
      <div className="admin-page">
        <div className="shop-header">
          <div className="section-label">Dashboard</div>
          <h1 className="shop-title">ORÉN Admin</h1>
        </div>

        <div className="admin-tabs">
          <button
            className={`admin-tab ${tab === 'orders' ? 'active' : ''}`}
            onClick={() => setTab('orders')}
          >
            Orders
          </button>
          <button
            className={`admin-tab ${tab === 'products' ? 'active' : ''}`}
            onClick={() => setTab('products')}
          >
            Products
          </button>
        </div>

        {tab === 'orders' && (
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
                    <span className="admin-order-status" style={{ color: statusColors[order.status] }}>
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
                    <span className="admin-order-status" style={{ color: statusColors[selected.status] }}>
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
        )}

        {tab === 'products' && (
          <div className="admin-products">
            <div className="admin-product-form">
              <div className="section-label" style={{ marginBottom: '1rem' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </div>

              <div className="checkout-form">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input className="form-input" name="name" value={productForm.name} onChange={handleProductChange} placeholder="e.g. Classic Tee — White" />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-input form-textarea" name="description" value={productForm.description} onChange={handleProductChange} placeholder="Short product description" />
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label className="form-label">Price (RWF)</label>
                    <input className="form-input" name="price" type="number" value={productForm.price} onChange={handleProductChange} placeholder="8000" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Stock</label>
                    <input className="form-input" name="stock" type="number" value={productForm.stock} onChange={handleProductChange} placeholder="20" />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select className="form-input" name="category" value={productForm.category} onChange={handleProductChange}>
                      <option value="tshirts">T-Shirts</option>
                      <option value="shirts">African Shirts</option>
                      <option value="pants">Pants</option>
                      <option value="sets">Sets</option>
                      <option value="sandals">Sandals</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Badge <span className="form-optional">(optional)</span></label>
                    <input className="form-input" name="badge" value={productForm.badge} onChange={handleProductChange} placeholder="New / Limited" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Sizes <span className="form-optional">(comma separated)</span></label>
                  <input className="form-input" name="sizes" value={productForm.sizes} onChange={handleProductChange} placeholder="XS, S, M, L, XL or 38, 39, 40..." />
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    className="btn-primary"
                    style={{ flex: 1, padding: '14px' }}
                    onClick={handleProductSubmit}
                    disabled={loading}
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  {editingProduct && (
                    <button
                      className="btn-ghost"
                      style={{ padding: '14px 20px' }}
                      onClick={() => { setEditingProduct(null); setProductForm(emptyProduct) }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="admin-product-list">
              <div className="section-label" style={{ marginBottom: '1rem' }}>All Products ({products.length})</div>
              {products.map(product => (
                <div key={product.id} className="admin-product-row">
                  <div className="admin-product-info">
                    <div className="admin-product-name">{product.name}</div>
                    <div className="admin-product-meta">
                      {product.category} · {product.price.toLocaleString()} RWF · Stock: {product.stock}
                    </div>
                  </div>
                  <div className="admin-product-actions">
                    <button className="admin-action-btn" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="admin-action-btn delete" onClick={() => handleDelete(product.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Admin