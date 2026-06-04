import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

const Collections = () => {
  const [sets, setSets] = useState([])
  const [shirts, setShirts] = useState([])
  const [sandals, setSandals] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('http://localhost:5000/api/products?category=sets').then(res => setSets(res.data))
    axios.get('http://localhost:5000/api/products?category=shirts').then(res => setShirts(res.data))
    axios.get('http://localhost:5000/api/products?category=sandals').then(res => setSandals(res.data))
  }, [])

  return (
    <div className="page-wrapper">
      <Nav />

      <div className="collections-page">

        <div className="collections-hero">
          <div className="collections-hero-text">
            <div className="story-tag">Curated</div>
            <h1 className="collections-title">The Collections</h1>
            <p className="collections-sub">Pieces chosen with intention. Worn together or apart.</p>
          </div>
        </div>

        <div className="collections-section">
          <div className="section-header">
            <div>
              <div className="section-label">Complete Looks</div>
              <div className="section-title">Full Sets</div>
            </div>
          </div>
          <div className="collections-grid">
            {sets.map(product => (
              <div key={product.id} className="collections-card" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="collections-img">
                  <span className="placeholder-text">Photo</span>
                </div>
                {product.badge && <div className="p-badge">{product.badge}</div>}
                <div className="collections-info">
                  <div className="p-name">{product.name}</div>
                  <div className="p-price">{product.price.toLocaleString()} RWF</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="collections-section collections-dark">
          <div className="section-header">
            <div>
              <div className="section-label" style={{ color: 'var(--warm)' }}>Tailored</div>
              <div className="section-title" style={{ color: 'var(--white)' }}>African Shirts</div>
            </div>
          </div>
          <div className="collections-grid">
            {shirts.map(product => (
              <div key={product.id} className="collections-card" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="collections-img" style={{ background: 'linear-gradient(135deg, var(--bark), var(--earth))' }}>
                  <span className="placeholder-text" style={{ color: 'var(--warm)' }}>Photo</span>
                </div>
                {product.badge && <div className="p-badge">{product.badge}</div>}
                <div className="collections-info" style={{ background: 'var(--earth)', borderTop: '0.5px solid rgba(255,255,255,0.08)' }}>
                  <div className="p-name" style={{ color: 'var(--white)' }}>{product.name}</div>
                  <div className="p-price">{product.price.toLocaleString()} RWF</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="collections-section">
          <div className="section-header">
            <div>
              <div className="section-label">Handcrafted</div>
              <div className="section-title">Leather Sandals</div>
            </div>
          </div>
          <div className="collections-grid collections-grid-wide">
            {sandals.map(product => (
              <div key={product.id} className="collections-card" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="collections-img collections-img-wide">
                  <span className="placeholder-text">Photo</span>
                </div>
                {product.badge && <div className="p-badge">{product.badge}</div>}
                <div className="collections-info">
                  <div className="p-name">{product.name}</div>
                  <div className="p-price">{product.price.toLocaleString()} RWF</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />
    </div>
  )
}

export default Collections