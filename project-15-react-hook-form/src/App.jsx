import './App.css'
import Header from './components/Header'
import FormRef from './components/FormRef'
import ReactHookForm from './components/ReactHookForm'
import FormZod from './components/FormZod'
import { MemorizedMemo } from './components/MemorizedMemo'

function App() {
  return (
    <div className="container">
      <h1>React</h1>
      <Header />
      <hr />
      <FormRef />
      <hr />
      <ReactHookForm />
      <hr />
      <FormZod />
      <hr />
      <MemorizedMemo />
    </div>
  )
}

export default App