import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Row, Col, Divider, Popover, Icon } from 'antd';
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import 'leaflet/dist/leaflet.css';
import './Mapping.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import axiosConfig from '../../api/axiosConfig';
import Legend from './Legend';

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." id="spiner-images" />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="without image"
        id="public-private-mapping-panel-image"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="panel image"
          id="public-private-mapping-panel-image"
        />
      );
    }
  }
};

const PublicMapping = () => {

  document.body.classList.remove('body_forms');

  const content = (
    <div>
      <p id="pop-over-content">Only for logged users!</p>
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
      {/* <Header /> */}
      <div id="leaflet-container">
        <LeafletMap
          style={{ height: 'calc(100vh - 48px)' }}
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
          tap={false}
        >
          <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
          {panels.map(item => {
            return (
              <Marker
                key={item.id}
                position={[item.lat, item.lon]}
                onClick={() => {
                  if (item.multimedia && item.multimedia !== "undefined" && item.multimedia.length > 0) {
                    getImage(item.multimedia[0].id);
                  } else {
                    setImageUrl('no-image');
                  }
                }}
              >
                <Popup>
                  <span>
                    <Popover content={content} id="popover">
                      <Icon style={{ fontSize: '16px', color: '#c3c3c3' }}
                        type="like"
                        id="like-icon" />
                    </Popover>
                    <p id="text-likes">likes:</p> <p id="number-likes">{item.likes}</p>
                  </span>
                  <div id="public-private-mapping-popup">
                    <Row>
                      <Col
                        span={24}
                        id="public-private-mapping-installation-name"
                      >
                        <p>{item.installationName}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={24}>
                        <div id="container-img">
                          <PanelImage imageUrl={imageUrl} />
                        </div>
                      </Col>
                    </Row>
                    <Divider id="divider-mapping-top" />
                    <Row id="public-private-mapping-text-fields">
                      <Col span={8}>
                        <h5 id="public-private-mapping-data-labels">
                          Installed capacity
                        </h5>
                        <h3 id="public-private-mapping-data-fields">
                          {item.electrical_capacity} kW
                        </h3>
                      </Col>
                      <Col span={8}>
                        <h5 id="public-private-mapping-data-labels">
                          Area
                        </h5>
                        <h3 id="public-private-mapping-data-fields">
                          {item.surface} m²
                        </h3>
                      </Col>
                      <Col span={8}>
                        <h5 id="public-private-mapping-data-labels">
                          Inverter capacity
                        </h5>
                        <h3 id="public-private-mapping-data-fields">
                          {item.inverterCapacity} kW
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
          <Legend />
        </LeafletMap>
      </div>
    </React.Fragment>
  );
};

export default PublicMapping;
