import React, {useRef, useEffect, useState} from "react"
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

const INITIAL_CENTER = [
    -74.0242,
    40.6941
]
const INITIAL_ZOOM = 10.12
const accessToken = 'pk.eyJ1Ijoic3RpdmV0c2EiLCJhIjoiY21hM3Q4azhvMDBtdjJpcXhpaDRtYjB2OCJ9.cAVLQ69PTYp33gHCB6yV1A'

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  useEffect(() => {
    mapboxgl.accessToken = accessToken
    mapRef.current = new mapboxgl.Map({
      container:mapContainerRef.current,
      center:center,
      zoom:zoom,
    });
    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()
      setCenter([mapCenter.lng, mapCenter.lat])
      setZoom(mapZoom)
    })
    return () => {
      mapRef.current.remove()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  const handleButtonClick = () => {
    mapRef.current.flyTo({
      center:INITIAL_CENTER,
      zoom:INITIAL_ZOOM
    })
  }
  return (
    <>
      <div className=" sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <button onClick={handleButtonClick} className="reset-button">
        Reset
      </button>
      <div id='map-container' ref={mapContainerRef}></div>
    </>
  )
}

export default App
