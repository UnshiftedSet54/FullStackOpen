import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({latlng}) => {

  const [ weather, setWeather ] = useState({})
  const apiKey = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}
    `).then(({data}) => setWeather({
      name: data.name, 
      temp: data.main.temp, 
      icon: data.weather[0].icon, 
      description: data.weather[0].description, 
      wind: data.wind.speed
    })).catch(error => console.log(error))
  }, [])

  return(
    <div>
      <h2>Weather in {weather.name}</h2>
      <div>temperature: {weather.temp} Celcius</div>
      <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.description}/>
      <div>wind: {weather.wind} m/s</div>
    </div>
  )
}

export default Weather