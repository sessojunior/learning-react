import Form from "./components/Form";


export default function App() {

  return (
    <div className="flex flex-col items-center justify-center w-full p-8">
      <h1 className="text-2xl font-bold text-center pb-8">Gerador de PDF dinâmico</h1>
      <Form />
    </div>
  )
}
