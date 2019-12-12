import React from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'

const PublicMapping = () => {

  const onMoveEnd = (event) => {
    const bounds = event.target.getBounds()
    console.log(bounds)
  }

  var style = { width: '44%', height: '310px' };
  return (

    <React.Fragment>
      <div className="leaflet-container-panel">
        <LeafletMap
          center={[50, 10]}
          zoom={5}
          maxZoom={18}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          onMoveEnd={onMoveEnd}
          style={style}
          onmoveend={onMoveEnd}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
        </LeafletMap>
      </div>
    </React.Fragment>
  )
}

export default PublicMapping;