import Biscoito from './components/Biscoito'
import styled from 'styled-components'
import { useState } from 'react'

const StyledMain = styled.main`
  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
`

function gerarSorte(fraseSorte, setFraseSorteGerada) {
  setFraseSorteGerada(fraseSorte[Math.floor(Math.random() * fraseSorte.length)])
}

function App() {
  const fraseSorte = [
    "A vida trará coisas boas se tiver paciência.",
    "Demonstre amor e alegria em todas as oportunidades e verá que a paz nasce dentro de si.",
    "Não compense na ira o que lhe falta na razão.",
    "Defeitos e virtudes são apenas dois lados da mesma moeda.",
    "A maior de todas as torres começa no solo.",
    "Não há que ser forte. Há que ser flexível.",
    "Todos os dias organiza os seus cabelos, por que não faz o mesmo com o coração?",
    "Há três coisas que jamais voltam; a flecha lançada, a palavra dita e a oportunidade perdida.",
    "A juventude não é uma época da vida, é um estado de espírito.",
    "Podemos escolher o que semear, mas somos obrigados a colher o que plantamos.",
    "Dê toda a atenção á formação dos seus filhos, sobretudo com bons exemplos da sua própria vida.",
    "Siga os bons e aprenda com eles.",
    "Não importa o tamanho da montanha, ela não pode tapar o sol.",
    "O bom-senso vale mais do que muito conhecimento.",
    "Quem quer colher rosas tem de estar preparado para suportar os espinhos.",
  ]
  const [fraseSorteGerada, setFraseSorteGerada] = useState("")

  return (
    <StyledMain>
      <div className="main">
        <h1>Biscoito da Sorte</h1>
        <p>Clique no botão abaixo do biscoito da sorte para ver a sua sorte!</p>
        <Biscoito />
        <button onClick={() => gerarSorte(fraseSorte, setFraseSorteGerada)}>Abrir Biscoito da Sorte</button>
        <p>{fraseSorteGerada}</p>
      </div>
    </StyledMain>
  )
}

export default App
