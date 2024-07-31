import Calculadora from "./components/Calculadora"


export default function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
      <div>
        <h1 className="text-2xl font-bold text-center pb-4">Calculadora</h1>
        <Calculadora />
      </div>
    </div>
  )
}
