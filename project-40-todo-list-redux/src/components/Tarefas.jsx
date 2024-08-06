import Tarefa from "./Tarefa"

import { useSelector, useDispatch } from "react-redux"
import { toggleTask, removeTask, filterTasks } from "../slices/todoSlice"

export default function Tarefas() {
  const { tasks, filter } = useSelector(state => state.todo)

  const dispatch = useDispatch()

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    else if (filter === 'completed') return task.completed
    else if (filter === 'uncompleted') return !task.completed
    else return true
  })

  return (
    <>
      <div>
        <button className="mx-1 border bg-green-600 text-white rounded py-2 px-4 hover:bg-green-700 transition-all" onClick={() => dispatch(filterTasks('all'))}>Todas</button>
        <button className="mx-1 border bg-green-600 text-white rounded py-2 px-4 hover:bg-green-700 transition-all" onClick={() => dispatch(filterTasks('completed'))}>Concluídas</button>
        <button className="mx-1 border bg-green-600 text-white rounded py-2 px-4 hover:bg-green-700 transition-all" onClick={() => dispatch(filterTasks('uncompleted'))}>Não concluídas</button>
      </div>
      <div className="w-full flex flex-col gap-2 pt-4 justify-start text-left">
        {filteredTasks.map(task => <Tarefa key={task.id} task={task} onToggle={() => dispatch(toggleTask(task.id))} onRemove={() => dispatch(removeTask(task.id))} />)}
      </div>
    </>
  )
}
