import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Product from './pages/Product'
import OurStory from './pages/OurStory'
import Founders from './pages/Founders'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import Admin from './pages/Admin'
import Collections from './pages/Collections'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/order/:order_number" element={<OrderConfirmation />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/founders" element={<Founders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App