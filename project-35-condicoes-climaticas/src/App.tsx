import Weather from "./components/Weather"

function App() {

  return (
    <div className="w-full p-8 flex flex-col justify-center items-center bg-blue-100 pb-16">
      <h1 className="text-3xl font-bold text-center py-8">Condições climáticas</h1>
      <Weather />
    </div>
  )
}

export default App
