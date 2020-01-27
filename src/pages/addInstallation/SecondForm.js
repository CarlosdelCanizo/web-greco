import React, { useState } from "react";
import { Button, Row, Col, Divider, Form, Card } from 'antd'
import { Link, Redirect } from "react-router-dom"
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './secondForm.css'
import 'leaflet/dist/leaflet.css';
import MapsCoords from "./MapsCoords";


const SecondForm = (props) => {

  var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
  console.log("A VORE SI APROFITA", currentPanelState)
  const [data, setData] = useState(currentPanelState);
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData(data.lat = ("" + lat), data.lon = ("" + lon));
    localStorage.setItem('currentPanelState', JSON.stringify(data))
    activateRedirection()
  }

  //Redirect
  const [toLocation, setLocation] = useState(false);
  function activateRedirection() {
    setLocation(true)
  }

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
                <input
                  id="lat"
                  name="lat"
                  value={lat}
                  readOnly={true}
                  required
                />

              </Form.Item>
            </Col>
            <Col id="col-register-panel-fields" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <label id="panel-input-label-second">Longitude</label>
                <Divider id="input-separator-second" />
                <input
                  id="lon"
                  name="lon"
                  value={lon}
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
                  zoom={8}
                  center={{ lat: 39.8714243295929, lng: -0.06466403603553773 }}
                />
              </div>
            </Col>

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