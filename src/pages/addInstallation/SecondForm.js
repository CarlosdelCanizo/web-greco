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
    console.log("el current del latitude longitude", latitude, longitude)
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
  console.log("lat lon:", lat, lon)
  console.log("el data lat y data lon", data.lat, data.lon)

  return (
    <Row>
      <div id="background-panel-register">
        <Card id="card-panel-register-inside">
          <Col span={24} id="" xs={24} sm={24} md={24} lg={24} xl={24}>
            <div id="pagination">
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletPle} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
            </div>
          </Col>

          <Link to="/private-mapping">
            <Button id="forms-close-button" onClick={clearPanel}>
              <Icon type="close" id="icon-x" />
            </Button>
          </Link>

          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <h2 id="tittle-panel-registration">Installation location</h2>
          </Col>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <p id="text-panel-registration">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </Col>
          <Form onSubmit={handleFormSubmit} >

            <Col id="col-register-panel-fields" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <label id="panel-input-label-second">Latitude</label>
                <Divider id="input-separator-second" />
                <Input
                  id="lat"
                  name="lat"
                  value={mobileLat != "" ? mobileLat : lat}
                  readOnly={true}
                  required
                />

              </Form.Item>
            </Col>
            <Col id="col-register-panel-fields" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <label id="panel-input-label-second">Longitude</label>
                <Divider id="input-separator-second" />
                <Input
                  id="lon"
                  name="lon"
                  value={mobileLon != "" ? mobileLon : lon}
                  readOnly={true}
                  required
                />
              </Form.Item>
            </Col>
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
                  // center={{ lat: 39.8714243295929, lng: -0.06466403603553773 }}
                  center={(mobileLat && mobileLon) ?
                    (({ lat: mobileLat, lng: mobileLon }))
                    :
                    ({ lat: 40.41717418841311, lng: -3.703317801130291 })}
                >

                </MapsCoords>
              </div>
            </Col>


            <div id="geo_response" />
            <input id="coordinatesFromMobile" name="coordinatesFromMobile"
              onClick={event => setMarker(JSON.parse(event.target.value))}
            >
            </input>
            <div>
              <p>{coordinates}</p>
            </div>


            <Col id="add-installation-container-button-second" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Link to="/first">
                <Button
                  id="button-panel-register-previous-second"
                >
                  PREVIOUS

              </Button>
              </Link>

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
          </Form >
        </Card >
      </div >
    </Row >

  )
}

export default SecondForm