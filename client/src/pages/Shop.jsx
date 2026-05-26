import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const filters = ['All', 'T-Shirts', 'Shirts', 'Pants', 'Sets', 'Sandals']

const categoryMap = {
  'All': 'all',
  'T-Shirts': 'tshirts',
  'Shirts': 'shirts',
  'Pants': 'pants',
  'Sets': 'sets',
  'Sandals': 'sandals'
}

const Shop = () => {
  const [products, setProducts] = useState([])
  const [active, setActive] = useState('All')
  const navigate = useNavigate()

  useEffect(() => {
    const category = categoryMap[active]
    const url = category === 'all'
      ? 'http://localhost:5000/api/products'
      : `http://localhost:5000/api/products?category=${category}`
    axios.get(url).then(res => setProducts(res.data))
  }, [active])

  return (
    <div>
      <Nav />
      <div className="shop-page">
        <div className="shop-header">
          <div className="section-label">Browse</div>
          <h1 className="shop-title">The Collection</h1>
        </div>

        <div className="product-filter">
          {filters.map(f => (
            <button
              key={f}
              className={`filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="shop-grid">
          {products.map(product => (
            <div
              key={product.id}
              className="shop-card"
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="shop-img">
                <span className="placeholder-text">Photo</span>
              </div>
              {product.badge && <div className="p-badge">{product.badge}</div>}
              <div className="shop-card-info">
                <div className="p-name">{product.name}</div>
                <div className="p-price">{product.price.toLocaleString()} RWF</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Shop