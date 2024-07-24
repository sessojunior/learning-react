import Card from "./Card"
import PropTypes from "prop-types"

export default function Board({ cards, setCards, flippedCards, setFlippedCards, chances, setChances, maxChances, result }) {

  // console.log("Board")
  // console.log("cards", cards)

  function resetGame() {
    setCards(prevCards => prevCards.map(card => ({ ...card, isFlipped: false })))
    setFlippedCards([])
    setChances(maxChances)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <Card key={index} card={card} cards={cards} setCards={setCards} flippedCards={flippedCards} setFlippedCards={setFlippedCards} chances={chances} setChances={setChances} />
      ))}
      </div>
      <div className="mt-6">
        <span className="text-xl">{chances === 0 ? (
          <span>Você perdeu!</span>
        ) : (
          result === cards.length ? (
            <span>Parabéns, você venceu!</span>
          ) : (
            <span>Você tem <b>{chances}</b> tentativa(s).</span>
          )
        )}</span>
      </div>
      <div className="my-6">
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xl" onClick={resetGame}>Reiniciar o jogo</button>
      </div>
    </div>
  )
}

Board.propTypes = {
  cards: PropTypes.array,
  setCards: PropTypes.func,
  flippedCards: PropTypes.array,
  setFlippedCards: PropTypes.func,
  chances: PropTypes.number,
  setChances: PropTypes.func,
  maxChances: PropTypes.number,
  result: PropTypes.number
}
