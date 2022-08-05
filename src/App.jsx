import { useEffect, useState } from 'react'
import './App.css'
import  Wheater  from './Components/Wheater'
import image from './assets/images/25501.jpg'

function App() {

const [coordinate, setCoondinate] = useState()

useEffect(() => {
   
  function fulfilled (pos){
     const info = {
       lat: pos.coords.latitude,
       lon: pos.coords.longitude 
     }
     setCoondinate(info)
  }
  navigator.geolocation.getCurrentPosition(fulfilled)
}, [])

  return (
    <div className="App" style={{ backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover'
    }}>
       <Wheater 
       lat = {coordinate?.lat}
       lon = {coordinate?.lon}/>
    </div>
  )
}
export default App
