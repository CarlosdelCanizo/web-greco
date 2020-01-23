import React, { useEffect, useState } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import "./Mapping.css"
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../header/Header'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Button, Row, Col, Divider } from 'antd'
import solar from '../../assets/solar.jpg'


const PrivateMapping = (props) => {

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
    // var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    axios.get('http://10.0.10.195:8088/solarPanel/getAllSolarPanel')
      .then(response => {
        setPanels(response.data)
      })
  }, [])

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
          {panels.map((item, id) => (
            <Marker key={id} position={[item.lat, item.lon]}>
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
                        {item.electrical_capacity} Kw
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
                    {/* <div >
                      {item.multimedia.length ? item.multimedia.map((multimedia, id) => (
                        <div key={id}>
                          {multimedia = { multimedia }}
                        </div>
                      ))
                        :
                        (<p>No images</p>)}
                    </div>
                    {item.comments.length ? item.comments.map((comment, id) => (
                      <div key={id}>
                        {comment = { comment }}
                      </div>
                    ))
                      :
                      (<p>No comments</p>)} */}
                  </Row>
                  <Row>
                    <Col span={12}>
                      <Link to="/show-panel-details">
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