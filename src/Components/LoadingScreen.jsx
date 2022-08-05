import React from 'react'
import image from '../assets/loadingScreen.png'

const LoadingScreen = () => {
  return (
    <div className='general_container'>
     <p className='tittle_loading'>Loading...</p>
     <img  className='loading_icon' src={image} alt="Weather icond loading screen" />
    </div>
  )
}
export default LoadingScreen