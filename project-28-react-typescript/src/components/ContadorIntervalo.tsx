import { useState } from 'react'
import useInterval from '../hooks/useInterval'

export default function ContadorIntervalo() {

  const [count, setCount] = useState(0)
  const seconds = 5

  useInterval(() => {
    setCount(count + 1)
  }, seconds * 1000)

  return (
    <div>
      <h2>Contador Intervalo</h2>
      <p>Muda a cada {seconds} segundos: {count}</p>
    </div>
  )
}
