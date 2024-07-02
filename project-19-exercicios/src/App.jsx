import './App.css'
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import TaskList from './components/TaskList'
import Timer from './components/Timer'

import Compras from './components/Compras'
import CartProvider from './contexts/Cart'

import User from './components/User'
import ProfileProvider from './contexts/Profile'
import ThemeProvider from './contexts/Theme'
import Conteudo from './components/Conteudo'

function App() {
  const tasks = [
    {
      id: 1,
      title: "Lavar a louca"
    },
    {
      id: 2,
      title: "Organizar as roupas"
    },
    {
      id: 3,
      title: "Ir ao banheiro"
    },
    {
      id: 4,
      title: "Arrumar o quarto"
    }
  ]

  return (
    <>
      <h1>Exercícios de React</h1>
      <h3>1. Componente funcional chamado Greeting que acita uma prop name e renderiza uma mensagem.</h3>
      <Greeting name="Luis" />
      <h3>2. Componente que renderiza um botão e um texto indicando o número de vezes que o botão foi clicado.</h3>
      <Counter />
      <h3>3. Componente TaskList que renderiza uma lista de tarefas.</h3>
      <TaskList tasks={tasks} />
      <h3>4. Componente Timer que renderiza um contador de segundos (useEffect).</h3>
      <Timer />
      <h3>5. Uso do Context API (useContext) para transferir o estado entre componentes.</h3>
      <ThemeProvider>
        <p><strong>Uso do tema</strong></p>
        <Conteudo />
        <ProfileProvider>
          <p><strong>Conteúdo do usuário</strong></p>
          <User />
        </ProfileProvider>
        <CartProvider>
          <p><strong>Carrinho de compras</strong></p>
          <Compras />
        </CartProvider>
      </ThemeProvider>
    </>
  )
}

export default App
