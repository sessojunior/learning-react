import { useEffect, useState } from "react"
import Quadrado from "./Quadrado"


export default function Tabuleiro() {
  const [isNext, setIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  const [aiIsPlaying, setAiIsPlaying] = useState(false)

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      }
    }

    return null
  }

  const winner = checkWinner(squares)

  const handleClick = (index) => {
    if (squares[index] || winner || aiIsPlaying) {
      return
    }

    const newSquares = squares.slice()
    newSquares[index] = isNext ? "X" : "O"
    setSquares(newSquares)
    setIsNext(!isNext)

    if (winner) {
      alert(`O vencedor é ${winner}`)
    }

    console.log(squares)
  }

  const handleRestart = () => {
    setIsNext(true)
    setSquares(Array(9).fill(null))
  }

  const aiPlay = (squares, setSquares, setIsNext) => {
    let play = null

    for (let i = 0; i < squares.length; i++) {
      if (!squares[i]) {
        play = i
        break
      }
    }

    if (play !== null) {
      const newSquares = squares.slice()
      newSquares[play] = "O"
      setSquares(newSquares)
      setIsNext(true)
    }
  }

  useEffect(() => {
    if (!winner && !isNext) {
      setAiIsPlaying(true)

      setTimeout(() => {
        aiPlay(squares, setSquares, setIsNext)
        setAiIsPlaying(false)
      }, 1000)
    }
  }, [isNext, squares, winner])

  return (
    <div>
      <p className="text-center text-lg p-2 font-bold rounded bg-yellow-300 mb-4">Status: {winner ? `O vencedor é ${winner}` : "Vez do jogador: " + (isNext ? "X" : "O")}</p>
      <div className="grid">
        <div className="grid grid-cols-3">
          <Quadrado value={squares[0]} onClick={() => handleClick(0)} />
          <Quadrado value={squares[1]} onClick={() => handleClick(1)} />
          <Quadrado value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="grid grid-cols-3">
          <Quadrado value={squares[3]} onClick={() => handleClick(3)} />
          <Quadrado value={squares[4]} onClick={() => handleClick(4)} />
          <Quadrado value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="grid grid-cols-3">
          <Quadrado value={squares[6]} onClick={() => handleClick(6)} />
          <Quadrado value={squares[7]} onClick={() => handleClick(7)} />
          <Quadrado value={squares[8]} onClick={() => handleClick(8)} />
        </div>
      </div>
      <p className="pt-4 text-center"><button className="mr-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700" onClick={handleRestart}>Reiniciar jogo</button></p>
    </div>
  )
}
