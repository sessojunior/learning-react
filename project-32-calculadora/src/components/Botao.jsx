export default function Botao({ type, children, onClick }) {
  return (
    <div className="bg-gray-100 hover:bg-gray-200 border border-gray-200 cursor-pointer transition-all rounded p-4 w-full text-center font-bold text-xl select-none" onClick={onClick}><span className={type === "number" ? "text-black" : "text-red-600"}>{children}</span></div>
  )
}
