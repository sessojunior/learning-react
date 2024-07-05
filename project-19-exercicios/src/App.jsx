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
import CounterReducer from './components/CounterReducer'
import DisplayWindowSize from './components/DisplayWindowSize'
import CalculoPesado from './components/CalculoPesado'
import UserInfo from './components/UserInfo'
import CalculoFibonacci from './components/CalculoFibonacci'

import useOnlineStatus from './hooks/useOnlineStatus'

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

  const userInfo = { name: "Luis", age: 20 }

  function OnlineStatusIndicator() {
    const isOnline = useOnlineStatus()

    return (
      <>
        <h4>Online Status</h4>
        <p>Online: {isOnline ? "Sim" : "Não"}</p>
      </>
    )
  }

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

      <h3>6. Uso do useReducer para criar estados mais complexos</h3>
      <CounterReducer />

      <h3>7. Custom hooks: exemplo de como obter a largura e altura da janela através de um hook personalizado</h3>
      <DisplayWindowSize />

      <h3>8. useMemo</h3>
      <CalculoPesado numero={10} />

      <h2>Outros exercícios</h2>

      <h3>1. Uso do useEffect para sincronização de dados</h3>
      <p>Exibir informações de um usuário que são recebidas via props em um componente.</p>
      <p>Criar um componente que use o hook useEffect para sincronizar as informações do usuário com o título da aba do navegador.</p>
      <UserInfo userInfo={userInfo} />

      <h3>2. Memorizar cálculos com useMemo</h3>
      <p>Supor que tem um componente que realiza um cálculo pesado, como uma função de Fibonacci que é chamada com um número específico. Usar o hook useMemo para evitar que o cálculo seja refeito desnecessariamente</p>
      <CalculoFibonacci numero={10} />

      <h3>3. Criação e uso de um Custom Hook</h3>
      <p>Criar um custom hook chamado useOnlineStatus que rastreia se o usuário está online ou offline. Usar este hook para exibir o status atual do usuário.</p>
      <OnlineStatusIndicator />

    </>
  )
}

export default App
