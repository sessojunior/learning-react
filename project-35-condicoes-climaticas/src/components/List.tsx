import { ForecastData } from "../types"

interface ListProps {
  forecast: ForecastData
}

const List: React.FC<ListProps> = ({ forecast }) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-center">Previsão para as próximas horas</h2>
      <ul className="pt-4">
        {forecast.list.slice(0, 14).map((item, index) => (
          <li key={index} className="flex border border-blue-300 rounded bg-blue-50 mb-2">
            <div className="flex justify-between w-full">
              <div className="flex items-center">
                <img src={`https://openweathermap.org/img/wn/${item?.weather[0].icon}@2x.png`} alt={item.weather[0].description} className="inline-block" />
              </div>
              <div className="flex flex-col py-4 px-6">
                <div className="text-lg font-bold text-right">{item.main.temp}° C</div>
                <div className="text-md text-right capitalize">{item.weather[0].description}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default List