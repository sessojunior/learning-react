import PropTypes from "prop-types"

export default function TaskItem({ task, changeStatus, removeTask }) {
  return (
    <>
      <li>[id: {task.id}] - name: {task.name} - status: {task.completed ? "Concluído" : "Nao concluído"} - <button onClick={() => changeStatus(task.id)}>Trocar status</button> - <button onClick={() => removeTask(task.id)}>Remover</button></li>
    </>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object,
  changeStatus: PropTypes.func,
  removeTask: PropTypes.func,
}
