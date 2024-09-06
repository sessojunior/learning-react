import { useState } from "react";
import { TTasks } from "../types.d";
import Dialog from "./Dialog"; // Importe o componente Dialog

export default function Tasks({
  tasks,
  setTasks,
}: {
  tasks: TTasks[];
  setTasks: React.Dispatch<React.SetStateAction<TTasks[]>>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<TTasks | null>(null);

  function removeTask(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);
    setTasks(newTasks);
  }

  function openDialog(task: TTasks) {
    setTaskToEdit(task);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setTaskToEdit(null);
    setIsDialogOpen(false);
  }

  function saveTask(updatedTask: TTasks) {
    const updatedTasks = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">Tarefas</h2>
      {tasks.length <= 0 ? (
        <div className="text-center text-gray-500">Não há tarefas</div>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task: TTasks) => (
            <li key={task.id} className="p-4 bg-gray-100 rounded-md">
              <div className="text-lg font-semibold text-gray-800">{task.title}</div>
              <div className="text-sm text-gray-600">Dificuldade: {task.difficulty}</div>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => openDialog(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => removeTask(task.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Componente de Dialog para editar a tarefa */}
      {isDialogOpen && taskToEdit && (
        <Dialog
          task={taskToEdit}
          isOpen={isDialogOpen}
          onClose={closeDialog}
          onSave={saveTask}
        />
      )}
    </div>
  );
}
