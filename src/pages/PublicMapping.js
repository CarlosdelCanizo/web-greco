import React, { useState, useEffect } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import Header from '../components/Header'
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axios from 'axios'

const PublicMapping = () => {

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

  const [panels, setPanels] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://10.0.10.195:8088/solarPanel',
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      setPanels(result.data.content);
    };
    fetchData();
  }, []);

  // PANELS VINGAU!
  // function showPanels(props) {
  //   const panels = props.panels;
  //   const listItems = panels.map((panel) =>
  //     <li key={panel.toString()}>
  //       {panel}
  //     </li>
  //   );
  //   return (
  //     <ul>{listItems}</ul>
  //   );
  // }

  // GET ALL SOLAR PANELS PAGINATION
  // function getAllSolarPanelsPagination() {
  //   var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
  //   axios.get("http://10.0.10.195:8088/solarPanel?size=2000&page=1",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": access_token
  //       }
  //     })
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log("hola soy tu RESPONSE", response)
  //         return response;
  //       }
  //     })
  //     .then(response => {
  //       console.log("hola soy tu RESPONSE", response)
  //     })
  //     .catch(error => {
  //       console.log("hola soy tu ERROR", error)
  //     });
  // }

  // getAllSolarPanelsPagination()
  // console.log("Ha pasado un ángel")

  // GET ALL SOLAR PANELS BY POSITION AND DISTANCE, ARA EN SERIO
  // function getAllSolarPanels() {
  //   var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
  //   axios.get("http://10.0.10.195:8088/solarPanel",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": access_token
  //       }
  //     })
  //     .then(response => {
  //       if (response.status === 200) {
  //         return response;
  //       }
  //     })
  //     .then(response => {
  //       debugger
  //       // setPanel({panel:response.data.content[0]})
  //       setPanels(response.data.content); 
  //       console.log("hola soy la carga útil", response.data.content[0])
  //     })
  //     .catch(error => {
  //       console.log("hola soy tu ERROR todos los paneles", error)
  //     });
  // }

  // getAllSolarPanels();
  // console.log("Papa noel te ha dejado esto:")

  return (
    <React.Fragment>
      <Header />
      <div className="leaflet-container">
        <LeafletMap
          style={{ height: '100vh' }}
          center={[50, 10]}
          zoom={5}
          maxZoom={10}
          attributionControl={true}
          zoomControl={true}
          doubleClickZoom={true}
          scrollWheelZoom={true}
          dragging={true}
          animate={true}
          easeLinearity={0.35}
        >
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {panels.map(item => (
          <Marker key={item.objectId} position={[item.lat, item.lon]}>
            <Popup>
              Installation name: {item.installationName}
              <br />
              Installation property: {item.installationProperty}
              <br />
              Installation Type: {item.installationType}
              <br />
              Latitude: {item.lat}
              <br />
              Longitude: {item.lon}
              <br />
              Tacking orientation: {item.panelTrackingOrientation}	
              <br />
              Tacking inclination: {item.panelTrackingInclination}	
              <br />
              Inclination: {item.inclination}
              <br />
              Orientation: {item.orientation}
              <br />
              Surface: {item.surface}
              <br />
              Technology used: {item.technologyUsed}
              <br />
              Electrical capacity: {item.electricalCapacity}
              <br />
              Inverter capacity: {item.inverterCapacity}
              <br />
              Commisioning Date: {item.commissioningDate}
              <br />
              Battery: {item.battery}
              <br />
              Battery description: {item.batteryDescription}
              <br />
              Observation: {item.observation}
          </Popup>
          </Marker>
           ))}
        </LeafletMap>
      </div>

    </React.Fragment>
  )
}

export default PublicMapping;