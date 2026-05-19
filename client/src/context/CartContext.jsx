import { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product, size) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size)
      if (exists) {
        return prev.map(i => i.id === product.id && i.size === size
          ? { ...i, quantity: i.quantity + 1 }
          : i
        )
      }
      return [...prev, { ...product, size, quantity: 1 }]
    })
  }

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const count = cart.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)