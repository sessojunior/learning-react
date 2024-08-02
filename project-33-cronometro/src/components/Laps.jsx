export default function Laps({ laps, formatTime }) {
  return (
    <div className="flex flex-col justify-center mt-4">
      <h2 className="text-2xl font-medium text-center">Voltas:</h2>
      <div className="text-center py-2">
        <ul>
          {laps.map((lap, index) => (
            <li key={index} className="font-medium inline-block p-2 border border-gray-300 bg-white rounded m-1">
              Volta {index + 1}: {formatTime(lap)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
