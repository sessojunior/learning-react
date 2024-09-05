// useContext
import { useContext } from "react"
import { SomeContext } from "../components/HookUseContext"

export default function About() {
  const { contextValue } = useContext(SomeContext)

  return (
    <div>
      <h3>About</h3>
      <p>Valor do contexto: {contextValue}</p>
      <hr />
    </div>
  )
}
