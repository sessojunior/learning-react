import { useState } from "react";
import { TTasks } from "../types.d";

interface FormProps {
  setTasks: React.Dispatch<React.SetStateAction<TTasks[]>>;
  tasks: TTasks[];
}

export default function Form({ setTasks, tasks }: FormProps) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState<number>(1); // Inicializa como número

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const newTask: TTasks = {
      id: Math.random() * 1000, // Simples forma de gerar um ID único
      title: title,
      difficulty: difficulty,
    };

    setTasks([...tasks, newTask]); // Adiciona a nova tarefa ao array existente
    setTitle(""); // Reseta o campo de título
    setDifficulty(1); // Reseta o campo de dificuldade
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">O que você vai fazer?</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título:
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da tarefa"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700">
            Dificuldade:
          </label>
          <select
            name="difficulty"
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(Number(e.target.value))} // Converte o valor para número
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value={1}>1 - Fácil</option>
            <option value={2}>2 - Moderado</option>
            <option value={3}>3 - Difícil</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
