

export default function Quadrado({ value, onClick }) {
  return (
    <button className="w-32 h-32 border-2 border-black hover:bg-gray-200 text-3xl font-bold" onClick={onClick}>{value}</button>
  )
}
