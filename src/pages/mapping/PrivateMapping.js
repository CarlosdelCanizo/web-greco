import React, { useState, useEffect } from 'react';
import { Map as LeafletMap, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Row, Col, Divider, Tooltip, Icon } from 'antd';
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import 'leaflet/dist/leaflet.css';
import './Mapping.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import Header from '../../header/Header';
import axiosConfig from '../../api/axiosConfig'
import { Link } from 'react-router-dom'

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
  const [imageUrl, setImageUrl] = useState();

  //LIKE
  const [isLike, setLike] = useState(null)
  const [likes, setLikes] = useState(0)

  //GIVE LIKE
  const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  const giveLike = (id) => {
    var body
    axiosConfig
      .post("/like/givelike/" + id, body,
        {
          headers: {
            "Authorization": access_token
          }
        })
      .then(response => {
        setLikes(response.data);
        setLike(!isLike)
      });

  }

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
            <Marker key={id} position={[item.lat, item.lon]}
              onClick={() => {
                if (item.multimedia && item.multimedia.length > 0) {
                  console.log('img exist with id: ', item.multimedia[0].id);
                  getImage(item.multimedia[0].id);
                } else {
                  console.log('img not exist');
                  setImageUrl('no-image');
                }
                setLikes(item.likes)
                setLike(item.selfLiked)
              }}
            >
              <Popup >
                <span>
                  <Tooltip title="Like" id="tooltip-like">
                    <Icon style={{ fontSize: '16px', color: '#c3c3c3' }}
                      type="like"
                      theme={isLike ? 'twoTone' : 'outlined'}
                      onClick={() => {
                        giveLike(item.id)
                      }}
                      id="like-icon" />
                  </Tooltip>
                  <p id="text-likes">likes:</p> <p id="number-likes">{likes}</p>
                </span>
                <div id="public-private-mapping-popup">
                  <Row>
                    <Col span={24} id="public-private-mapping-installation-name">
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
                      <Link to={
                        {
                          pathname: "/show-panel-details",
                          myPanel: { item }
                        }
                      }>
                        <Button id="mapping-button-left">
                          + info
                    </Button>
                      </Link>
                    </Col>
                    <Col span={12}>
                      <Link to={
                        {
                          pathname: "/feed-panel",
                          // pathname: `/feed-panel/${item.id}`,
                          myPanel: { item }
                        }
                      }>
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