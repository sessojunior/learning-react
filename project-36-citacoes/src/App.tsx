import Citacoes from "./components/Citacoes";


export default function App() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center pb-8">Citações</h1>
      <Citacoes />
    </div>
  )
}
