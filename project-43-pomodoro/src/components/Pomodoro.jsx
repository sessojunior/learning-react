import { useState, useEffect, useRef } from "react"

export default function Pomodoro() {
  const [minutes, setMinutes] = useState(25)
  const [currentMinutes, setCurrentMinutes] = useState(25)
  const [currentSeconds, setCurrentSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setCurrentSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (currentMinutes === 0) {
              clearInterval(intervalRef.current)
              return 0
            }
            setCurrentMinutes((prevMinutes) => prevMinutes - 1)
            return 59
          }
          return prevSeconds - 1
        })
      }, 1000)
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => clearInterval(intervalRef.current)
  }, [isActive, currentMinutes])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsActive(false)
    setIsPaused(true)
  }

  const handleReset = () => {
    setIsActive(false)
    setIsPaused(false)
    setCurrentMinutes(minutes)
    setCurrentSeconds(0)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <div className="border border-gray-200 bg-gray-50 rounded p-8 w-96">
        <h1 className="text-2xl font-medium text-center mb-6">Pomodoro</h1>
        <div className="flex justify-center items-center">
          <div className="p-4 border border-gray-200 bg-white rounded w-40 flex justify-center">
            <span className="text-3xl text-center text-blue-700">
              {String(currentMinutes).padStart(2, "0")} : {String(currentSeconds).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="pt-6">
          <div className="pb-4">
            <label htmlFor="time" className="block pb-2">Definir tempo (em minutos)</label>
            <input
              type="number"
              name="time"
              id="time"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              step="1"
              placeholder="0"
              min="1"
              max="60"
              required
              className="border border-gray-300 rounded px-4 py-2"
              disabled={isActive || isPaused}
            />
          </div>
          <div>
            {isActive ? (
              <button
                type="button"
                className="border border-yellow-600 rounded py-2 px-4 text-white bg-yellow-600 hover:bg-yellow-700"
                onClick={handlePause}
              >
                Pausar
              </button>
            ) : (
              <button
                type="button"
                className="border border-green-600 rounded py-2 px-4 text-white bg-green-600 hover:bg-green-700"
                onClick={handleStart}
              >
                {isPaused ? "Continuar" : "Iniciar"}
              </button>
            )}
            <button
              type="button"
              className="border border-gray-500 rounded py-2 px-4 text-white bg-gray-500 hover:bg-gray-600 ml-2"
              onClick={handleReset}
            >
              Reiniciar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
