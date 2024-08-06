import { useDispatch } from "react-redux"
import { addTask } from "../slices/todoSlice"
import { useState } from "react"

export default function AdicionarTarefa() {
  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (input.trim() === "") return
    dispatch(addTask(input))
    setInput("")
  }

  return (
    <div className="w-full flex justify-center items-center pb-4">
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Adicione uma tarefa..." className="border border-gray-300 rounded p-2 mr-2 w-80" />
        <button type="submit" className="border border-blue-500 rounded py-2 px-4 text-white bg-blue-500 hover:bg-blue-600">Adicionar</button>
      </form>
    </div>
  )
}
