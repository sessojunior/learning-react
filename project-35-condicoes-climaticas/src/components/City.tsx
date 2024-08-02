import { WeatherData } from "../types"

interface CityProps {
  city: string;
  weather?: WeatherData;
}

const City: React.FC<CityProps> = ({ city, weather }) => {
  return (
    <div className="flex flex-col pt-8 pb-4 justify-center">
      <h2 className="text-xl font-bold text-center">{city}</h2>
      <div className="text-center">
        <img src={`https://openweathermap.org/img/wn/${weather?.weather[0].icon}@2x.png`} alt={weather?.weather[0].description} className="inline-block" />
      </div>
      <div className="text-center font-medium text-lg">{weather?.main.temp}° C</div>
      <div className="text-center text-md capitalize">{weather?.weather[0].description}</div>
    </div>
  )
}

export default City