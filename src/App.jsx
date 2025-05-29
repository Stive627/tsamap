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

  useEffect(()=>{
    function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    mapRef.current.flyTo({
      center:[longitude, latitude],
      zoom: INITIAL_ZOOM
    })
  }
    function error() {
    console.log("Unable to retrieve your location")
  }
  navigator.geolocation.getCurrentPosition(success, error);
  },[])

  return (
    <>
      <div className=" sidebar">
        Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} | Zoom: {zoom.toFixed(2)}
      </div>
      <div id='map-container' ref={mapContainerRef}></div>
    </>
  )
}

export default App
