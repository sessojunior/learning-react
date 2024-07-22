import { useState } from "react"
import PropTypes from "prop-types"

export default function Product({ product, updateQtyCart }) {
  const [qty, setQty] = useState(1)

  const styleButton = "mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"

  // console.log("product", product)

  return (
    <li key={product.id} className="pb-2">
      {product.id} -
      <img src={product.image} alt={product.name} width={40} /> -
      {product.name} -
      R$ {product.price.toFixed(2)} -
      <select name="qty" value={qty} onChange={(e) => setQty(e.target.value)}>
        {Array(product.qty).fill().map((_, i) => <option key={i} value={i + 1}>{i + 1}</option>)}
      </select> itens disponíveis - 
      <button className={styleButton} onClick={() => updateQtyCart(product, qty, product.qty)}>Adicionar ao carrinho</button>
    </li>
  )
}

Product.propTypes = {
  product: PropTypes.object,
  updateQtyCart: PropTypes.func,
  removeFromCart: PropTypes.func
}
