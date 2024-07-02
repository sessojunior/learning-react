import { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const CartContext = createContext({})

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: 'Máquina fotográfica',
      quantity: 1,
      value: 789.25,
    },
    {
      id: 2,
      name: 'Cama',
      quantity: 2,
      value: 450.90,
    },
    {
      id: 3,
      name: 'Cadeira',
      quantity: 1,
      value: 242.00,
    }
  ])
  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node
}
