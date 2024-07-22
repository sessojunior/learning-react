import { createContext, useState, useEffect } from "react"
import PropTypes from "prop-types"

export const CartContext = createContext([])

import { toast } from "react-toastify"

export default function CartProvider({ children }) {

  const [cart, setCart] = useState(localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [])

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  function updateQtyCart(product, qty, maxQty) {

    console.log("product cart", product)
    console.log("qty cart", qty)
    console.log("maxQty cart", maxQty)
    console.log("cart addToCart", cart)
    // substitui a quantidade se o item ja estiver no carrinho
    const productCart = cart.find((item) => item.id === product.id)
    if (productCart) {
      setCart(cart.map((item) => item.id === product.id ? { ...productCart, qty: Number(qty), maxQty: Number(maxQty) } : item))
      toast.success("Quantidade alterada!")
    } else {
      setCart([...cart, { ...product, qty: Number(qty), maxQty: Number(maxQty) }])
      toast.success("Item adicionado ao carrinho!")
    }
  }
  
  function removeFromCart(id) {
    console.log("remove id", id)
    if (!cart.some((item) => item.id === id)) {
      toast.error("Esse item nao existe no carrinho!")
      return
    }
    setCart(cart.filter((item) => item.id !== id))
    toast.success("Item removido do carrinho!")
  }

  const totalCart = cart.reduce((total, product) => total + (product.qty * product.price), 0)

  return (
    <CartContext.Provider value={{ cart, updateQtyCart, removeFromCart, totalCart }}>
      {children}
    </CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.node,
}