import JogoDaVelha from "./components/JogoDaVelha"


export default function App() {

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center pb-4">Jogo da velha</h1>
      <JogoDaVelha />
    </div>
  )
}
