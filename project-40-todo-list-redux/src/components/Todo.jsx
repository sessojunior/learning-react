import Tarefas from "./Tarefas"
import AdicionarTarefa from "./AdicionarTarefa"

export default function ListaTarefas() {
  return (
    <div className="w-full p-8 flex flex-col justify-center items-center text-center bg-gray-50 rounded border border-gray-300">
      <h1 className="text-2xl font-bold text-center pb-8">Lista de tarefas com Redux</h1>
      <AdicionarTarefa />
      <Tarefas />
    </div>
  )
}
