import Board from "./Board"
import { useState } from "react"

export default function Game() {

  // console.log("Game")

  const values = ["A", "B", "C", "D", "E", "F", "G", "H"]
  // console.log(values)

  const duplicatedValues = [...values, ...values]
  // console.log(duplicatedCards)

  const flippedValues = duplicatedValues.map((value, index) => ({ id: index + 1, value, isFlipped: false }))
  // console.log(flippedValues)

  const shuffledCards = flippedValues.sort(() => Math.random() - 0.5)
  // console.log(shuffledCards)

  const [cards, setCards] = useState(shuffledCards)
  const [flippedCards, setFlippedCards] = useState([])
  const maxChances = 10
  const [chances, setChances] = useState(maxChances)
  // console.log("cards", cards)

  const result = cards.filter((card) => card.isFlipped).length
  // console.log("result", result)

  return (
  <div className="flex justify-center items-center">
      <Board cards={cards} setCards={setCards} flippedCards={flippedCards} setFlippedCards={setFlippedCards} chances={chances} maxChances={maxChances} setChances={setChances} result={result} />
    </div>
  )
}
