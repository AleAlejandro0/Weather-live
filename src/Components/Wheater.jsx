import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LoadingScreen from './LoadingScreen'
import { WiCloudy } from "react-icons/wi"
import { WiWindy } from "react-icons/wi"
import { WiSprinkle } from "react-icons/wi"
import { WiThermometerExterior } from "react-icons/wi"

const Wheater = ({lat, lon}) => {
  
  const [weather, setWeather] = useState()
  const [temperature, setTemperature] = useState()
  const [celsius, setCelsius] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(lat){
        const APIkey = 'c747b191882bbc38c7f791b36404522a'
        const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`

        axios.get(URL)
            .then(res => {
              setWeather(res.data)
              const temperature = {
                  celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                  fahrenheit: `${Math.round((res.data.main.temp - 273.15) * 9/5 + 32)} °F`
              }   
               setTemperature(temperature)
               setLoading(false)
              })

            .catch(err => console.log(err))
       }  
    }, [lat, lon])

    
  const toggleState = () => setCelsius(!celsius)
  console.log(weather)

  if(loading){
    return <LoadingScreen />
  }else{
  return (
    <div className='general_container'>
    
      <div className='frame'>
       <header className='header'>
          <h1>Wheather Live</h1>
          <h2>{weather?.name}, {weather?.sys.country}</h2>
       </header>
       <main>                      
          <div className='temperature_shown'>{celsius ? temperature?.celsius : temperature?.fahrenheit }
            <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="weather image status" /> 
         </div>
          <button className='main_button' onClick={toggleState}>{celsius ? 'Show in °F' : 'Show in °C'}
          </button>
       </main>
        <div className='first_section'>
         <p>{weather?.weather[0].main}</p>
         </div>
       <div className='second_section'>
           <ul className='list'>
             <li className='li_left'><WiCloudy size='35px' color='rgb(114, 206, 206)'/> Cloudiness: {weather?.clouds.all}%</li>
             <li className='li_left'><WiWindy size='35px' color='rgb(114, 206, 206)'/> Wind speed: {weather?.wind.speed} m/s</li>
           </ul>
           <ul>
             <li className='li_right'><WiSprinkle size='35px' color='rgb(114, 206, 206)'/>Humidity: {weather?.main.humidity}%</li>
             <li><WiThermometerExterior size='35px' color='rgb(114, 206, 206)'/> Pressure: {weather?.main.pressure} mbar</li>
            </ul>
       </div>
      </div>
    </div>
  )
 }
}
export default Wheater
