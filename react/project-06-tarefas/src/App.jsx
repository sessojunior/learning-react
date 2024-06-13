import { useCallback, useEffect, useState, useMemo } from "react"

export default function App() {
  const [tarefas, setTarefas] = useState(localStorage.getItem("tarefas") ? JSON.parse(localStorage.getItem("tarefas")) : [])
  const [input, setInput] = useState("")
  const totalTasks = useMemo(() => tarefas.length, [tarefas])

  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas))
  }, [tarefas])

  const handleAddTask = useCallback(() => {
    const idTask = tarefas.reduce((acc, tarefa) => Math.max(acc, tarefa.id), 0) + 1
    console.log(idTask)
    setTarefas([...tarefas, { id: idTask, nome: input }])
  }, [tarefas, input])

  return (
    <>
      <h1>Lista de tarefas</h1>
      <input type="text" placeholder="digite sua tarefa" onChange={(e) => setInput(e.target.value)} />
      <button type="button" onClick={handleAddTask}>Adicionar</button>
      <hr />
      <p>Total de tarefas: {totalTasks}</p>
      {totalTasks > 0 &&
        <ul>
          {tarefas.map((tarefa) => (
            <li key={tarefa.id}>{tarefa.nome}</li>
          ))}
        </ul>
      }
    </>
  )
}
