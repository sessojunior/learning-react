export default function Button({ children, onClick }) {
  return (
    <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 cursor-pointer transition-all select-none" onClick={onClick}>{children}</button>
  )
}
