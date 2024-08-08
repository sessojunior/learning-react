import InfiniteScroll from "./components/InfiniteScroll"

export default function App() {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-2xl font-bold p-4">Infinite Scroll</h1>
      <p className="pb-4">Conteúdo de vários posts abaixo para rolagem infinita:</p>
      <InfiniteScroll />
    </div>
  )
}
