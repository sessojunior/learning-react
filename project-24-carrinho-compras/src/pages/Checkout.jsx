import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"

import { CartContext } from "../contexts/Cart"
import { useContext } from "react"

export default function Checkout() {

  const { cart, totalCart } = useContext(CartContext)

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem("cart") || JSON.parse(localStorage.getItem("cart")).length === 0) {
      navigate("/")
      console.log("sem dados no carrinho")
    }
  }, [])

  return (
    <>
      <h1>Checkout</h1>
      <p>Página de finalização de compra.</p>
      {cart.length > 0 && (
        <>
          <p>Produtos no carrinho: {cart.length}</p>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>{product.name} - {product.qty} x R$ {product.price.toFixed(2)}</li>
            ))}
          </ul>
          <p>Total: R$ {totalCart.toFixed(2)}</p>
          <p><Link to="/carrinho"><button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">Ir para o carrinho de compras</button></Link></p>
        </>
      )}

    </>
  )
}
