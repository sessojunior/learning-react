import Form from "./components/Form";

export default function App() {

  return (
    <div className="w-full p-8 flex flex-col justify-center items-center bg-gray-50">
      <h1 className="text-2xl font-bold text-center pb-8">Formulário de avaliação</h1>
      <p className="pb-8 text-center">Ficamos felizes com a sua compra, deixe sua opinião abaixo.</p>
      <Form />
    </div>
  )
}

