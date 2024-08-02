import { useEffect, useState } from "react"
import Button from "./Button"
import Display from "./Display"
import Laps from "./Laps"

export default function Cronometro() {
  const [milliseconds, setMilliseconds] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  const [intervalId, setIntervalId] = useState(null)
  const [laps, setLaps] = useState([])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000)
    const seconds = Math.floor((time % 60000) / 1000)
    const milliseconds = Math.floor((time % 1000) / 10)
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`
  }

  const startTimer = () => {
    const interval = setInterval(() => {
      setMilliseconds((prev) => prev + 10)
    }, 10)
    setIntervalId(interval)
  }

  const stopTimer = () => {
    clearInterval(intervalId)
    setIntervalId(null)
  }

  useEffect(() => {
    if (timerOn) {
      startTimer()
    } else {
      stopTimer()
    }
    return () => stopTimer()
  }, [timerOn])

  const resetTimer = () => {
    setTimerOn(false)
    setMilliseconds(0)
    setLaps([])
  }

  const recordLap = () => {
    setLaps((prevLaps) => [...prevLaps, milliseconds])
  }

  return (
    <div className="w-96 border border-gray-200 bg-gray-100 rounded p-4">
      <div>
        <Display>{formatTime(milliseconds)}</Display>
      </div>
      <div className="flex gap-2 justify-center mt-4">
        {!timerOn ? (
          <Button onClick={() => { setTimerOn(true); recordLap() }}>Iniciar</Button>
        ) : (
          <Button onClick={() => { setTimerOn(false); recordLap() }}>Pausar</Button>
        )}
        <Button onClick={resetTimer}>Zerar</Button>
      </div>
      {laps.length > 0 && <Laps laps={laps} formatTime={formatTime} />}
    </div>
  )
}
