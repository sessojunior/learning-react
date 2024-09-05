import { useReducer, useState } from 'react'

export default function App() {

  const initialTodos = [
    { id: 1, text: 'Tarefa 1', done: false },
    { id: 2,  text: 'Tarefa 2', done: false },
    { id: 3, text: 'Tarefa 3', done: false }
  ]

  const reducer = (state, action) => {
    switch (action.type) {
      case 'addTodo':
        return [
          ...state,
          {
            id: Math.random() * 1000,
            text: action.text,
            done: false
          }
        ]
      case 'removeTodo':
        return state.filter(todo => todo.id !== action.id)
      case 'toggleTodo':
        return state.map(todo => {
          if (todo.id === action.id) {
            return {
              ...todo,
              done: !todo.done
            }
          }
          return todo
        })
      default:
        return state
    }
  }

  const [todos, dispatch] = useReducer(reducer, initialTodos)
  const [text, setText] = useState('')

  return (
    <>
      <h1>Todo list com useReducer</h1>
      <form>
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <button
          type="submit"
          onClick={e => {
            e.preventDefault()
            dispatch({ type: 'addTodo', text: text })
          }}>Adicionar</button>
      </form>
      {todos.map(todo => (
        <div key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => dispatch({ type: 'toggleTodo', id: todo.id })} />
            {todo.text}
          </label>
          <button
            onClick={() => dispatch({ type: 'removeTodo', id: todo.id })}>Remover</button>
        </div>
      ))}
    </>
  )
}

