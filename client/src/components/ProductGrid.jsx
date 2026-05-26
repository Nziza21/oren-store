import { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../context/CartContext'

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
  const [selectedSizes, setSelectedSizes] = useState({})
  const { addToCart } = useCart()

  useEffect(() => {
    const category = categoryMap[active]
    const url = category === 'all'
      ? 'http://localhost:5000/api/products'
      : `http://localhost:5000/api/products?category=${category}`
    axios.get(url).then(res => setProducts(res.data))
  }, [active])

  const handleSize = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }))
  }

  const handleAdd = (product) => {
    const size = selectedSizes[product.id]
    if (!size) return alert('Please select a size')
    addToCart(product, size)
  }

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
          <div key={product.id} className={`p-card p-card-${i % 9}`}>
            <div className="p-img">
              <span className="placeholder-text">Photo</span>
            </div>
            {product.badge && <div className="p-badge">{product.badge}</div>}
            <div className="p-sizes">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`size-btn ${selectedSizes[product.id] === size ? 'active' : ''}`}
                  onClick={() => handleSize(product.id, size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button className="p-add" onClick={() => handleAdd(product)}>+</button>
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