import React, {useEffect, useState} from "react"
import {GoogleMap, useLoadScript} from '@react-google-maps/api'

function App(){ 
  
  const KEY_API = 'AIzaSyARg0EOtovWBXVQpcWSwI3I8clW1uMxqic'
  const [coords, setCoords] = useState({lat:0, lng:0})
  const {isLoaded} = useLoadScript({googleMapsApiKey:'AIzaSyARg0EOtovWBXVQpcWSwI3I8clW1uMxqic'})

  useEffect(()=>{
    function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCoords({lat:latitude, lng:longitude})
  }
    function error() {
    console.log("Unable to retrieve your location")
  }
  navigator.geolocation.getCurrentPosition(success, error);
  },[])

  if(!isLoaded || !coords.lat || !coords.lng) return <p style={{textAlign:'center'}}> Loading..., {isLoaded} {coords.lat} {coords.lng}</p>
  return (
    <GoogleMap center={coords} zoom={12} mapContainerStyle={{width:'100%', height:'100vh'}}/>
  )
}

export default App
