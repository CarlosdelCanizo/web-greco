import React, { useEffect, useState } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./Mapping.css"
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../components/header/Header'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, Icon, Divider, Collapse } from 'antd'
import solar from '../../assets/solar.jpg'


const PrivateMapping = () => {

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
      var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
      const result = await axios(
        'http://10.0.10.195:8088/solarPanel',
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        }
      );
      setPanels(result.data.content);
      // console.log("Els panels!?", result.data.content)
      // console.log("Directament panels!?", panels)
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div className="leaflet-container">
        <LeafletMap
          style={{ height: '94vh' }}
          center={[50, 10]}
          zoom={4}
          maxZoom={18}
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
              <Popup >
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
                      <Link to="/show-panel">
                        <Button id="mapping-button-left">
                          + info
                    </Button>
                      </Link>
                    </Col>
                    <Col span={12}>
                      <Link to="/feed-panel">
                        <Button id="mapping-button-right">
                          Feed
                    </Button>
                      </Link>
                    </Col>
                  </Row>
                </div>
              </Popup>
            </Marker>
          ))}
        </LeafletMap>
      </div>
    </React.Fragment >
  )
}

export default PrivateMapping;