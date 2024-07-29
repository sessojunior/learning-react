import './App.css'
import BarraFerramentas from './components/BarraFerramentas'
import Contador from './components/Contador'
import ContadorIntervalo from './components/ContadorIntervalo'
import Counter from './components/Counter'
import Exercises from './components/Exercises'
import ExibirPostagens from './components/ExibirPostagens'
import Greeting from './components/Greeting'
import TextInput from './components/TextInput'
import { TemaProvider } from './contexts/TemaContext'

function App() {
  return (
    <>
      <h1>React com Typescript</h1>
      {/* 1 - Componente funcional com Typescript */}
      <Greeting />
      <Greeting name="Luis" />
      {/* 2 - Hooks com tipos */}
      <Counter initialCount={0} />
      {/* 3 - Manipulação de eventos com tipos */}
      <TextInput />
      {/* 4 - Custom hooks */}
      <ContadorIntervalo />
      {/* 5 - Exercícios */}
      <Exercises />
      {/* 6 - useReducer com Typescript */}
      <Contador />
      {/* 7 - useContext (Context API) com Typescript */}
      <TemaProvider>
        <BarraFerramentas />
      </TemaProvider>
      {/* 8 - Requsição de API com Axios usando Typescript */}
      {/* npm install axios @types/axios */}
      <ExibirPostagens />
    </>
  )
}

export default App
