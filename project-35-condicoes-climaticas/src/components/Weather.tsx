import { useEffect, useState } from "react"
import City from "./City"
import List from "./List"
import Search from "./Search"
import axios from "axios"
import { WeatherData } from "../types"
import { ForecastData } from "../types"


const Weather = () => {
  const apiKey = import.meta.env.VITE_API_KEY_OPENWEATHERMAP || ""
  const [city, setCity] = useState("")
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)
  const country = "BR"

  useEffect(() => {
    console.log(apiKey)
    const getWeather = async () => {

      console.log("city", city)
      
      if (city === "") return

      const urlClimate = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&lang=pt_br&appid=${apiKey}`
      
      console.log("urlClimate", urlClimate)

      const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&lang=pt_br&appid=${apiKey}`

      console.log("urlWeather", urlForecast)
      
      try {
        const responseWeather = await axios.get(urlClimate)
        console.log(responseWeather.data)
        setWeather(responseWeather.data)
        setCity(responseWeather.data.name)

        const responseForecast = await axios.get(urlForecast)
        console.log(responseForecast.data)
        setForecast(responseForecast.data)

      } catch (error) {
        console.log(error)
      }
    }

    getWeather()
  }, [city, apiKey])

  // Geolocation
  useEffect(() => {
    try {
      navigator.geolocation.getCurrentPosition(async (position) => {

        // Se o usuário der a permissão de localização
        console.log("position", position)

        const lat = position.coords.latitude
        const lon = position.coords.longitude
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${apiKey}`

        const responseGeolocation = await axios.get(url)
        console.log(responseGeolocation.data)
        setCity(responseGeolocation.data.name)

      })
    } catch (error) {
      console.log(error)
    }
  }, [apiKey])

  return (
    <div className="w-96 bg-blue-200 border border-blue-300 rounded p-8">
      <Search city={city} setCity={setCity} />
      {weather && <City city={city} weather={weather} />}
      {forecast && <List forecast={forecast} />}
    </div>
  )
}

export default Weather