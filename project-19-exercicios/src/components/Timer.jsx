import { useState, useEffect } from "react"

export default function Timer() {
  const [time, setTime] = useState(0)

  useEffect(() => {
    // setInterval()
    const interval = setInterval(() => {
      // prevTime - valor anterior do time
      setTime((prevTime) => prevTime + 1)
    }, 1000)

    // clearInterval() - Limpeza de estado
    return () => clearInterval(interval)
  }, [time])

  return (
    <div>
      <h4>Timer</h4>
      <p>Timer: {time} segundos passados</p>
    </div>
  )
}
