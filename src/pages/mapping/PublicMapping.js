import React, { useState, useEffect } from 'react'
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Row, Col, Divider, Popover } from 'antd'
import solar from '../../assets/solar.jpg'
import "leaflet/dist/leaflet.css";
import "./Mapping.css"
import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../header/Header'
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

  const [panels, setPanels] = useState([])
  var idImage
  const [imageUrl, setImageUrl] = useState()

  //GET PANEL IMAGE
  function getImage() {
    axios({
      url: 'http://10.0.10.195:8088/multimedia/' + 13 + '/getImage/',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setImageUrl(url)

    });
  }

  useEffect(() => {
    axios.get('http://10.0.10.195:8088/solarPanel/getAllSolarPanel')
      .then(response => {
        setPanels(response.data)
        getImage()
      })
  }, [])

  console.log("ELS PANELS DEL SERVER:", panels)

  console.log("EL ID DE LA IMATGE")

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
                      <p>{item.id}</p>
                      {idImage = item.multimedia.map(array => array.id)}
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <img src={imageUrl} alt="image" id="public-private-mapping-panel-image" />
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