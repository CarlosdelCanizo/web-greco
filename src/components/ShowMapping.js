import React from 'react';
import { Map as LeafletMap, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
//import '../pages/mapping/showMapping.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const ShowMapping = ({ lat, lon }) => {

  document.body.classList.remove('body_forms');

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return (
    <React.Fragment>
      <div className="leaflet-container">
        <LeafletMap
          style={{ height: 'calc(100vh - 48px)', zIndex: '1' }}
          center={[lat, lon]}
          zoom={4}
          maxZoom={18}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
          tap={false}
        >
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />

          <Marker position={[lat, lon]} />
        </LeafletMap>
      </div>
    </React.Fragment >
  )
}

export default ShowMapping;