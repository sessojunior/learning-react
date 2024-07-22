import { Link } from "react-router-dom"
import products from "../data/products"

import { useContext } from "react"
import { CartContext } from "../contexts/Cart"

import Product from "../components/Product"

export default function Home() {

  // console.log("products", products)
  const styleButton = "mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"

  const { cart, updateQtyCart } = useContext(CartContext)


  console.log("cart", cart)

  return (
    <>
      <h1 className="pb-2">Página inicial: Catálogo de produtos</h1>
      {products.length > 0 && (
        <ul>
          {products.map((product) => (
            <Product key={product.id} product={product} updateQtyCart={updateQtyCart} />
          ))}
        </ul>
      )}
      <p className="pt-2">
        <Link to="/carrinho"><button className={styleButton}>Ir para o carrinho de compras</button></Link>
      </p>
    </>
  )
}
