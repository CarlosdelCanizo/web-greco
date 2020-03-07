import React, { useState, useEffect } from "react";
import { Button, Row, Col, Divider, Form, Card, Icon, Input } from 'antd'
import { Link, Redirect } from "react-router-dom"
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import 'leaflet/dist/leaflet.css';
import './secondForm.css'
import MapsCoords from "./MapsCoords";

const SecondForm = props => {

  //MOBILE COORDINATES*********************************************************
  //MOBILE VERSION
  // var isMobile = JSON.parse(localStorage.getItem("isMobile"));
  window.parent.postMessage('getCoordinates', '*');
  const [coordinates, setCoordinates] = useState()
  function setMarker(coords) {
    setMobileLat(coords.Latitude)
    setMobileLon(coords.Longitude)
  }
  //MOBILE COORDINATES********************************************************

  var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));

  var latitude
  var longitude
  if (currentPanelState && currentPanelState.lat !== "" && currentPanelState.lon !== "") {
    latitude = currentPanelState.lat
    longitude = currentPanelState.lon
  }
  if (currentPanelState === undefined) {
    latitude = ""
    longitude = ""
  }

  const [data, setData] = useState(currentPanelState);
  const [lat, setLat] = useState(latitude);
  const [lon, setLon] = useState(longitude);
  const [mobileLat, setMobileLat] = useState('');
  const [mobileLon, setMobileLon] = useState('');


  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    if (lat !== "" && lat !== undefined && lon !== "" && lon !== undefined)
      setData(data.lat = ("" + lat), data.lon = ("" + lon));
    localStorage.setItem('currentPanelState', JSON.stringify(data))
    activateRedirection()
  }

  //Redirect
  const [toLocation, setLocation] = useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  const isEnabled =
    (data.lat && data.lat !== undefined || lat && lat !== "") &&
    (data.lat && data.lon !== undefined || lat && lat !== "");

  function clearPanel() {
    localStorage.removeItem("currentPanelState")
    localStorage.removeItem("currentPanelId")
  }

  return (
    <Row>
      <Card id="card-panel-register-inside">
        <Form onSubmit={handleFormSubmit} >
          <Row>
            <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2}>

            </Col>
            <Col span={20} xs={20} sm={20} md={20} lg={20} xl={20}>
              <div id="pagination">
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletPle} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
              </div>
            </Col>
            <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2}>
              <Link to="/my-installations">
                <Button id="forms-close-button" onClick={clearPanel}>
                  <Icon type="close" id="icon-x" />
                </Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <h2 id="tittle-panel-registration">Locate your installation</h2>
            </Col>
          </Row>
          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <p id="text-panel-registration">
                Place your geographical coordinates clicking on the map.
            </p>
            </Col>
          </Row>

          <Row>
            <Col id="col-register-panel-fields" xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-longlat-background">
                  <label id="panel-longlat-label">Latitude</label>
                  <Input
                    id="lat"
                    name="lat"
                    value={mobileLat != "" ? mobileLat : lat}
                    readOnly={true}
                    required
                  />
                </div>
              </Form.Item>
            </Col>
            <Col id="col-register-panel-fields" xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-longlat-background-right">
                  <label id="panel-longlat-label">Longitude</label>
                  <Input
                    id="lon"
                    name="lon"
                    value={mobileLon != "" ? mobileLon : lon}
                    readOnly={true}
                    required
                  />
                </div>
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <div id="coords-container">
                <MapsCoords
                  setLat={setLat}
                  setLon={setLon}
                  zoom={(mobileLat && mobileLon) ? (18) : (3)}
                  mobileLat={mobileLat}
                  mobileLon={mobileLon}
                  setMobileLat={setMobileLat}
                  setMobileLon={setMobileLon}
                  center={(mobileLat && mobileLon) ?
                    (({ lat: mobileLat, lng: mobileLon }))
                    :
                    ({ lat: 40.41717418841311, lng: -3.703317801130291 })}
                >
                </MapsCoords>
              </div>
            </Col>
          </Row>
          <Divider className="transparentDivider"></Divider>
          <Row>
            <Col id="add-installation-container-button-second" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Link to="/first">
                <Button
                  id="button-panel-register-previous-second"
                >
                  BACK

              </Button>
              </Link>
              <div id="geo_response" />
              <input id="coordinatesFromMobile" name="coordinatesFromMobile"
                onClick={event => setMarker(JSON.parse(event.target.value))}
              >
              </input>
              <div>
                <p>{coordinates}</p>
              </div>
            </Col>
            <Col id="add-installation-container-button-second" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>

              <Button
                disabled={!isEnabled}
                id="button-panel-register-next-second"
                onClick={handleFormSubmit}
              >
                NEXT
                {toLocation ? <Redirect from="/second" to="/third" /> : null}
              </Button>

            </Col>
          </Row>
        </Form >
      </Card >
    </Row >

  )
}

export default SecondForm