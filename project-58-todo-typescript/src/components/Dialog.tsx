import { useState, useEffect } from "react";
import { TTasks } from "../types.d";

interface DialogProps {
  task: TTasks | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedTask: TTasks) => void;
}

export default function Dialog({ task, isOpen, onClose, onSave }: DialogProps) {
  const [title, setTitle] = useState(task ? task.title : "");
  const [difficulty, setDifficulty] = useState<number>(task ? task.difficulty : 1);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDifficulty(task.difficulty);
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const handleSave = () => {
    if (task) {
      const updatedTask: TTasks = { ...task, title, difficulty: Number(difficulty) };
      onSave(updatedTask);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h3 className="text-lg font-bold mb-4">Editar Tarefa</h3>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título:
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Dificuldade:
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={1}>1 - Fácil</option>
            <option value={2}>2 - Moderado</option>
            <option value={3}>3 - Difícil</option>
          </select>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}
