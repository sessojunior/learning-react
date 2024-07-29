import { useState, useEffect } from 'react'

export default function Counter({ initialCount }: CounterProps) {
  const [count, setCount] = useState<number>(initialCount ?? 0)

  useEffect(() => {
    console.log(`Contador: ${count}`)
  }, [count])

  return (
    <div>
      <h2>Contador</h2>
      <p><button onClick={() => setCount((prev) => prev - 1)}>Diminuir o contador</button> {count} <button onClick={() => setCount((prev) => prev + 1)}>Aumentar o contador</button></p>
    </div>
  )
}

type CounterProps = {
  initialCount?: number
}
