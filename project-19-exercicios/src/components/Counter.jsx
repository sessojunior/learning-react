import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0)

  function handleIncrement() {
    setCount(count + 1)
  }

  function handleDecrement() {
    setCount(count - 1)
  }

  return (
    <>
      <button onClick={handleDecrement}>
        Diminuir o contador
      </button>
      <p>Este botão foi clicado {count} vezes.</p>
      <button onClick={handleIncrement}>
        Aumentar o contador
      </button>
    </>
  )
}