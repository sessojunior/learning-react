

export default function Tarefa({ task, onToggle, onRemove }) {
  return (
    <div className="w-full py-2 px-4 flex justify-between bg-gray-200 border border-gray-300 rounded">
      <div className="flex items-center pr-4 cursor-default select-none" onClick={onToggle}><span className={task.completed ? "cursor-pointer line-through" : "cursor-pointer"}>{task.title}</span></div>
      <div><button className="border border-red-500 rounded py-2 px-4 text-white bg-red-500 hover:bg-red-600" onClick={onRemove}>Remover</button></div>
    </div>
  )
}
