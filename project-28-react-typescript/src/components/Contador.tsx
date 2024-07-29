import { useReducer } from "react"

export default function Contador() {

  const countReducer = (state: number, action: { type: string, payload: number }) => {
    switch (action.type) {
      case 'increment':
        return state + action.payload
      case 'decrement':
        return state - action.payload
      default:
        return state
    }
  }

  const [count, dispatch] = useReducer(countReducer, 0)

  return (
    <>
      <h2>Contador usando useReducer</h2>
      <div>
        <button onClick={() => dispatch({ type: 'decrement', payload: 5 })}>Decrementar</button>
        {count}
        <button onClick={() => dispatch({ type: 'increment', payload: 5 })}>Incrementar</button>
      </div>
    </>
  )
}
