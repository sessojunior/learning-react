import Markdown from "./components/Markdown";

export default function App() {

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <h1 className="text-2xl font-bold pb-8">Markdown</h1>
      <Markdown />
    </div>
  )
}

