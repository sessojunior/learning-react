import PropTypes from "prop-types"
import { useState } from "react"

export default function TaskInput({ addTask }) {
  const [taskInput, setTaskInput] = useState("")

  function handleAddTask(e) {
    e.preventDefault()
    const task = {
      id: Math.ceil(Math.random() * 100000),
      name: e.target.task.value,
      completed: false,
    }
    if (!taskInput.trim()) return
    addTask(task)
    e.target.task.value = ""
  }

  return (
    <>
      <h2>
        Task Input
        <form onSubmit={handleAddTask}>
          <input type="text" name="task" className="task-input" placeholder="Adicione uma nova tarefa" value={taskInput} onChange={e => setTaskInput(e.target.value)} />
          <button className="task-add-btn" type="submit">Adicionar</button>
        </form>
      </h2>
    </>
  )
}

TaskInput.propTypes = {
  addTask: PropTypes.func
}
