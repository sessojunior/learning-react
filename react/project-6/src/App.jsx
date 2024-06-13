import { useState } from "react"

export default function App() {
  const [tarefas, setTarefas] = useState([
    { id: 7, nome: "Lista 1" },
    { id: 65, nome: "Lista 2" },
    { id: 5, nome: "Lista 3" },
  ])
  const [input, setInput] = useState("")
  const [totalTasks, setTotalTasks] = useState(tarefas.length)

  const handleAddTask = () => {
    const idTask = tarefas.reduce((acc, tarefa) => Math.max(acc, tarefa.id), 0) + 1
    console.log(idTask)
    setTarefas([...tarefas, { id: idTask, nome: input }])
    setTotalTasks(tarefas.length + 1)
  }

  return (
    <>
      <h1>Lista de tarefas</h1>
      <input type="text" placeholder="digite sua tarefa" onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={handleAddTask}>Adicionar</button>
      <hr />
      <p>Total de tarefas: {totalTasks}</p>
      <ul>
        {tarefas.map((tarefa) => (
          <li key={tarefa.id}>{tarefa.nome}</li>
        ))}
      </ul>
    </>
  )
}
