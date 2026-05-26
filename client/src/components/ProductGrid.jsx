import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const filters = ['All', 'T-Shirts', 'Shirts', 'Pants', 'Sets', 'Sandals']

const categoryMap = {
  'All': 'all',
  'T-Shirts': 'tshirts',
  'Shirts': 'shirts',
  'Pants': 'pants',
  'Sets': 'sets',
  'Sandals': 'sandals'
}

const ProductGrid = () => {
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
    <section className="products">
      <div className="section-header">
        <div>
          <div className="section-label">Featured</div>
          <div className="section-title">New Arrivals</div>
        </div>
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

      <div className="product-grid">
        {products.map((product, i) => (
          <div
            key={product.id}
            className={`p-card p-card-${i % 9}`}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <div className="p-img">
              <span className="placeholder-text">Photo</span>
            </div>
            {product.badge && <div className="p-badge">{product.badge}</div>}
            <div className="p-info">
              <div className="p-name">{product.name}</div>
              <div className="p-price">{product.price.toLocaleString()} RWF</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProductGrid