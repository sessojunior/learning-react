export default function Visor({ size, label }) {
  return (
    <div className="border border-gray-300 bg-gray-200 rounded p-4 w-full text-right mb-2 font-bold min-h-16 text-wrap">
      <span className={size === "big" ? "text-4xl break-words" : "text-md break-words"}>{label}</span>
    </div>
  )
}
