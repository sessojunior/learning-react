import { useContext } from "react"
import { CartContext } from "../contexts/Cart"

import { Link } from "react-router-dom"

import ProductCart from "../components/ProductCart"

export default function Cart() {
  
  const styleButton = "mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"

  const { cart, updateQtyCart, removeFromCart, totalCart } = useContext(CartContext)

  console.log("cart", cart)

  return (
    <>
      <h1>Carrinho de compras: {cart.length > 0 && (
        <>{cart.length} itens</>
      )}</h1>
      {cart.length === 0 && (
        <p>Carrinho vazio</p>
      )}
      {cart.length > 0 && (
        <>
          <ul>
            {cart.map((product) => (
              <ProductCart key={product.id} product={product} updateQtyCart={updateQtyCart} removeFromCart={removeFromCart} />
            ))}
          </ul>

          <p className="pt-2">Total: R$ {totalCart.toFixed(2)}</p>
        </>
      )}

      <p className="pt-2"><Link to="/"><button className={styleButton}>Continuar comprando</button></Link></p>

      <p className="pt-2"><Link to="/checkout"><button className={styleButton}>Finalizar compra</button></Link></p>
    </>
  )
}
