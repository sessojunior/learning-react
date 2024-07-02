import PropTypes from "prop-types"

export default function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return <p>Não há tarefas a mostrar</p>
  }
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul> 
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array
}

