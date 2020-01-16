import React, { useState, useEffect } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Row, Col, Divider, Popover } from 'antd'
import solar from '../../assets/solar.jpg'
import "leaflet/dist/leaflet.css";
import "./Mapping.css"
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../components/header/Header'
import axios from 'axios'

const PublicMapping = () => {

  const content = (
    <div>
      <p>Only for logged users!</p>
    </div>
  );

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


  //CONTROL MAP
  // const leafletMap;

  // function handleZoomstart(map) {
  //   console.log(this.leafletMap && this.leafletMap.leafletElement);
  // };

  // function getMapZoom() {
  //   return this.leafletMap && this.leafletMap.leafletElement.getZoom();
  // }

  // console.log("el leafletMap", leafletMap)

  const [panels, setPanels] = useState([])

  // useEffect(() => {
  //   const leafletMap = leafletMap.leafletElement;
  //   leafletMap.on('zoomend', () => {
  //     window.console.log('Current zoom level -> ', leafletMap.getZoom());
  //   });
  // });

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
      <div id="leaflet-container">
        <LeafletMap

          // ref={(ref) => { leafletMap = ref; }}

          style={{ height: '95vh' }}
          center={[50, 10]}
          zoom={4}
          maxZoom={12}
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
            <Marker key={item.id} position={[item.lat, item.lon]}>
              <Popup>
                <div id="public-private-mapping-popup">
                  <Row>
                    <Col span={24} id="public-private-mapping-installation-name">
                      <p>{item.installationName}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <img src={solar} alt="image" id="public-private-mapping-panel-image" />
                    </Col>
                  </Row>
                  <Divider id="show-panel-divider" />
                  <Row id="public-private-mapping-text-fields">
                    <Col span={8}>
                      <h5 id="public-private-mapping-data-labels">
                        Electrical capacity
                      </h5>
                      <h3 id="public-private-mapping-data-fields">
                        {item.electricalCapacity} Kw
                      </h3>
                    </Col>
                    <Col span={8}>
                      <h5 id="public-private-mapping-data-labels">
                        Surface
                      </h5>
                      <h3 id="public-private-mapping-data-fields">
                        {item.surface} Kw
                      </h3>
                    </Col>
                    <Col span={8}>
                      <h5 id="public-private-mapping-data-labels">
                        Inverter capacity
                      </h5>
                      <h3 id="public-private-mapping-data-fields">
                        {item.inverterCapacity} Kw
                      </h3>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Popover content={content} id="popover">
                        <Button id="mapping-button-left">
                          + info
                    </Button>
                      </Popover>
                    </Col>
                    <Col span={12}>
                      <Popover content={content} id="popover">
                        <Button id="mapping-button-right">
                          Feed
                    </Button>
                      </Popover>
                    </Col>
                  </Row>
                </div>
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>

    </React.Fragment>
  )
}

export default PublicMapping;