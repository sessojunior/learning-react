import { useContext } from "react"

import { TemaContext } from "../contexts/TemaContext"

export default function BarraFerramentas() {
  const contextoTema = useContext(TemaContext)

  return (
    <>
      <h2>Barra de Ferramentas</h2>
      <button onClick={contextoTema?.alternarTema}>Alterar tema</button>
      <p>Tema: {contextoTema?.tema}</p>
    </>
  )
}
