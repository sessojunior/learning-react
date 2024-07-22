import { Link } from "react-router-dom"

export default function Menu() {

  return (
    <>
      <p className="pb-2"><Link to="/">Home</Link> | <Link to="/carrinho">Carrinho</Link> | <Link to="/checkout">Checkout</Link></p>
    </>
  )
}
