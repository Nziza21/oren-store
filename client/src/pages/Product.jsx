import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import { useCart } from '../context/CartContext'

const Product = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [toast, setToast] = useState('')

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(res => setProduct(res.data))
  }, [id])

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2500)
  }

  const handleAdd = () => {
    if (!selectedSize) return showToast('Please select a size first')
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize)
    }
    setAdded(true)
    showToast('Added to cart')
    setTimeout(() => setAdded(false), 2000)
  }

  if (!product) return (
    <div>
      <Nav />
      <div className="product-loading">Loading...</div>
    </div>
  )

  return (
    <div className="page-wrapper">
      <Nav />
      <Toast message={toast} />
      <div className="product-page">
        <div className="product-img-side">
          <div className="product-main-img">
            <span className="placeholder-text">Product Photo</span>
          </div>
        </div>

        <div className="product-info-side">
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back
          </button>

          {product.badge && <div className="p-badge" style={{ position: 'static', display: 'inline-block', marginBottom: '1rem' }}>{product.badge}</div>}

          <h1 className="product-name">{product.name}</h1>
          <div className="product-price">{product.price.toLocaleString()} RWF</div>

          <p className="product-description">{product.description}</p>

          <div className="product-sizes-section">
            <div className="sizes-label">Select Size</div>
            <div className="product-sizes">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn-lg ${selectedSize === size ? 'active' : ''}`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-section">
            <div className="sizes-label">Quantity</div>
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="qty-value">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => setQuantity(q => q + 1)}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="btn-primary add-to-cart-btn"
            onClick={handleAdd}
          >
            {added ? 'Added to Cart ✓' : 'Add to Cart'}
          </button>

          <div className="product-details">
            <div className="detail-row">
              <span>Category</span>
              <span style={{ textTransform: 'capitalize' }}>{product.category}</span>
            </div>
            <div className="detail-row">
              <span>Availability</span>
              <span>{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Product