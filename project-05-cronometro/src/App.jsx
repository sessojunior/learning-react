import styled from "styled-components"
import Cronometro from "./components/Cronometro"

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  h1 {
    padding-bottom: 20px;
  }
`

export default function App() {
  return (
    <Main>
        <h1>Cronômetro</h1>
        <Cronometro />
    </Main>
  )
}
