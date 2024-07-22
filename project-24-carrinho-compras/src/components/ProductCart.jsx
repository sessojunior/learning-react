import { useState } from "react"
import PropTypes from "prop-types"

export default function ProductCart({ product, updateQtyCart, removeFromCart }) {
  const [qty, setQty] = useState(product.qty)

  const styleButton = "mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
  const styleButtonRemove = "mr-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"

  // console.log("product", product)
  console.log("qty", qty)

  return (
    <li key={product.id} className="pb-2">
      {product.id} -
      <img src={product.image} alt={product.name} width={40} /> -
      {product.name} -
      R$ {product.price.toFixed(2)} - {product.qty} itens no carrinho - 
      <select name="qty" value={qty} onChange={(e) => setQty(Number(e.target.value))}>
        {Array(product.maxQty).fill().map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
      </select> - 
      <button className={styleButton} onClick={() => updateQtyCart(product, qty, product.maxQty)}>Atualizar quantidade no carrinho</button> 
      <button className={styleButtonRemove} onClick={() => removeFromCart(product.id)}>Remover do carrinho</button>
    </li>
  )
}

ProductCart.propTypes = {
  product: PropTypes.object,
  updateQtyCart: PropTypes.func,
  removeFromCart: PropTypes.func
}
