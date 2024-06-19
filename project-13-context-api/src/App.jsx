import './App.css'

import Alunos from './components/Alunos'
import NomeProvider from './contexts/NomeContext'

function App() {
  return (
    <>
      <NomeProvider nomeInicial="Mario Junior">
        <div>
          <h1>Context API</h1>
          <p>Projeto utilizando o Context API do React</p>
          <Alunos />
        </div>
      </NomeProvider>
    </>
  )
}

export default App
