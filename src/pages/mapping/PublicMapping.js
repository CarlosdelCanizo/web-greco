import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Row, Col, Divider, Popover } from 'antd';
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import 'leaflet/dist/leaflet.css';
import './Mapping.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../header/Header';
import axiosConfig from '../../api/axiosConfig'

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="image"
        id="public-private-mapping-no-image-panel"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="image"
          id="public-private-mapping-panel-image"
        />
      );
    }
  }
};

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
      ref.leafletElement.openPopup();
    }
  };

  const [panels, setPanels] = useState([]);
  const [imageUrl, setImageUrl] = useState();

  //GET PANEL IMAGE
  function getImage(id) {
    axiosConfig({
      url: '/multimedia/' + id + '/getImage/',
      method: 'GET',
      responseType: 'blob'
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      setImageUrl(url);
    });
  }

  //GET ALL PANELS
  useEffect(() => {
    axiosConfig
      .get('/solarPanel/getAllSolarPanel')
      .then(response => {
        setPanels(response.data);
      });
  }, []);

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
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {panels.map(item => {
            return (
              <Marker
                key={item.id}
                position={[item.lat, item.lon]}
                onClick={() => {
                  if (item.multimedia && item.multimedia.length > 0) {
                    console.log('img exist with id: ', item.multimedia[0].id);
                    getImage(item.multimedia[0].id);
                  } else {
                    console.log('img not exist');
                    setImageUrl('no-image');
                  }
                }}
              >
                <Popup>
                  <div id="public-private-mapping-popup">
                    <Row>
                      <Col
                        span={24}
                        id="public-private-mapping-installation-name"
                      >
                        <p>{item.installationName}</p>
                        <p>{item.id}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <div id="container-img">
                          <PanelImage imageUrl={imageUrl} />
                        </div>
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
                        <h5 id="public-private-mapping-data-labels">Surface</h5>
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
                          <Button id="mapping-button-left">+ info</Button>
                        </Popover>
                      </Col>
                      <Col span={12}>
                        <Popover content={content} id="popover">
                          <Button id="mapping-button-right">Feed</Button>
                        </Popover>
                      </Col>
                    </Row>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </LeafletMap>
      </div>
    </React.Fragment>
  );
};

export default PublicMapping;
