import TaskItem from "./TaskItem"
import PropTypes from "prop-types"

export default function TaskList({ tasks, changeStatus, removeTask }) {
  return (
    <>
      <h2>Task List</h2>
      {tasks.length === 0 && <p>Não há tarefas a mostrar</p>}
      {tasks.length > 0 && <>
        <p>Quantidade de tarefas: {tasks.length}</p>
        <ul className="task-list">
          {tasks.map(task => <TaskItem key={task.id} task={task} changeStatus={changeStatus} removeTask={removeTask} />)}
        </ul>
      </>}
    </>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  changeStatus: PropTypes.func,
  removeTask: PropTypes.func,
}
