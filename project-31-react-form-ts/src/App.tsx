import Form from "./components/Form"

function App() {
  return (
    <>
      <div className="w-full p-8 flex flex-col justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-center">React Hook Form com Typescript</h1>
        <div className="w-full p-8 flex justify-center">
          <Form />
        </div>
      </div>
    </>
  )
}

export default App
