import { useReducer } from 'react'

const initialState = { count: 0 }

export default function CounterReducer() {

  function reducer(state, action) {
    switch (action.type) {
      case 'increment':
        return { count: state.count + 1 }
      case 'decrement':
        return { count: state.count - 1 }
      case 'reset':
        return initialState
      default:
        throw new Error("Ação inválida")
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <h4>Contador com useReducer</h4>
      <p>Contador: {state.count}</p>
      <button onClick={() => dispatch({ type: 'decrement' })}>Diminuir o contador</button>
      <button onClick={() => dispatch({ type: 'increment' })}>Aumentar o contador</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Resetar</button>
    </>
  )
}
