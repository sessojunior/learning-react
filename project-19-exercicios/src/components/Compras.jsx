import { useContext } from "react"
import { CartContext } from "../contexts/Cart"

export default function Compras() {
  const { cart, setCart } = useContext(CartContext)

  function handleRemove(id) {
    setCart(cart.filter((product) => product.id !== id))
  }

  return (
    <div>
      <h4>Compras</h4>
      <ul>
        {cart.length === 0 && <p>Não há produtos no carrinho.</p>}
        {cart.length > 0 && cart.map((product) => (
          <li key={product.id}>
            {product.name} - {product.quantity} unidade - R$ {product.value} - <button onClick={() => handleRemove(product.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  )
}
