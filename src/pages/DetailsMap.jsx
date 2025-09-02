import React from 'react'
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'

const mapContainerStyle = {
  width: '100%',
  height: '400px',
}

const defaultZoom = 12

export function DetailsMap({ stay }) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyBcLlKvJiWUP1ytSSJ3fbYlGiwZrdNGsQM',
  })

  if (loadError) return <div>Error loading maps</div>
  if (!isLoaded) return <div>Loading map...</div>

  const center = {
    lat: stay.loc.lat,
    lng: stay.loc.lng,
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={defaultZoom}
      center={center}
    >
      <Marker
        position={center}
        icon={{
          path: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z M12 11.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
          fillColor: '#fe385c',
          fillOpacity: 1,
          strokeWeight: 0,
          scale: 2,
          anchor: { x: 12, y: 24 },
        }}
      />
    </GoogleMap>
  )
}
