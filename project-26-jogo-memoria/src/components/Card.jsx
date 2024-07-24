import PropTypes from "prop-types"

export default function Card({ card, cards, setCards, flippedCards, setFlippedCards, chances, setChances }) {

  // console.log("Card", card)

  function handleClick(clickedCard) {

    console.log("clickedCard", clickedCard)

    if (chances === 0) {
      return
    }

    if (flippedCards.length === 2) {
      return
    }

    // console.log("cards", cards)

    const newCards = cards.map(card => {
      if (card.id === clickedCard.id) {
        return { ...card, isFlipped: true }
      } else {
        return card
      }
    })

    setCards(newCards)
    // console.log("newCards", newCards)

    setFlippedCards(prevFlippedCards => [...prevFlippedCards, clickedCard])

    if (flippedCards.length === 1) {
      setTimeout(() => {
        if (clickedCard.value !== flippedCards[0].value) {
          const resetCards = newCards.map(card => {
            if (card.id === flippedCards[0].id || card.id === clickedCard.id) {
              return { ...card, isFlipped: false }
            } else {
              return card
            }
          })
          setCards(resetCards)
          setChances(prevChances => prevChances - 1)
        }

        setFlippedCards([])
      }, 1000)
    }
  }

  const classNotFlipped = "flex justify-center items-center w-20 h-20 bg-blue-300 hover:bg-blue-400 rounded cursor-pointer"
  const classFlipped = "flex justify-center items-center w-20 h-20 bg-blue-100 hover:bg-blue-200 rounded cursor-pointer"

  return (
    <button className={card.isFlipped ? classFlipped : classNotFlipped} onClick={() => handleClick(card)}>
      <span className="text-2xl leading-none">{card.isFlipped ? card.value : "?"}</span>
    </button>
  )
}

Card.propTypes = {
  card: PropTypes.object,
  cards: PropTypes.array,
  setCards: PropTypes.func,
  flippedCards: PropTypes.array,
  setFlippedCards: PropTypes.func,
  chances: PropTypes.number,
  setChances: PropTypes.func,
}
