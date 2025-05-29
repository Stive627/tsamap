import React, {useRef, useEffect} from "react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const accessToken = 'pk.eyJ1Ijoic3RpdmV0c2EiLCJhIjoiY21hM3Q4azhvMDBtdjJpcXhpaDRtYjB2OCJ9.cAVLQ69PTYp33gHCB6yV1A'
  useEffect(() => {
    mapboxgl.accessToken = accessToken
    mapRef.current = new mapboxgl.Map({
      container:mapContainerRef.current
    })
    return () => mapRef.current.remove()
  },[])
  return (
    <>
      <div id='map-container' ref={mapContainerRef}></div>
    </>
  )
}

export default App
