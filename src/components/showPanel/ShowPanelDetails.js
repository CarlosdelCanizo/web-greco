import React, { useState, useEffect } from "react"
import { Card, Button, Row, Col, Icon, Input, Form, List, Comment, Divider } from 'antd'
import solar from '../../assets/solar.jpg'
import axios from 'axios'
import Header from '../../header/Header'
import "./ShowPanel.css"
import { Link } from "react-router-dom";

const ShowPanelDetails = (props) => {

  const [showData, setData] = useState({})
  var panelId = props.id

  //GET MY SOLAR PANELS
  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://10.0.10.195:8088/solarPanel/' + "69",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        }
      );
      setData(result.data);
      console.log("showData show panels details", showData)
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div id="chat-panel-exterior-background">
        <Card id="chat-panel-container">
          <Row>
            <Col span={24} id="chat-panel-tittle">
              <p>{props.installationName}</p>
              <Link to="/my-installations">
                <Button id="chat-panel-close-button">
                  <Icon type="close" />
                </Button>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <img src={solar} alt="panel-image" id="installation-image" />
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={8}>
              <h5 id="chat-panel-data-labels">
                Electrical capacity
                </h5>
              <h4 id="show-panel-data-fields">
                {props.electricalCapacity} Kw
                </h4>
            </Col>
            <Col span={8}>
              <h5 id="chat-panel-data-labels">
                Surface
                </h5>
              <h4 id="show-panel-data-fields">
                {props.surface}m²
                </h4>
            </Col>
            <Col span={8}>
              <h5 id="chat-panel-data-labels">
                Inverter capacity
                </h5>
              <h4 id="show-panel-data-fields">
                {props.inverterCapacity}Kw
                </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Installation property
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.installationProperty}
              </h4>
            </Col>
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Technollogy used
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.technologyUsed}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Tracking orientation
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.panelTrackingOrientation}
              </h4>
            </Col>
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Tracking inclination
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.panelTrackingIncliation}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Orientation
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.orientation}°
                </h4>
            </Col>
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Inclination
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.inclination}°
                </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Battery
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.battery}
              </h4>
            </Col>
            <Col span={12}>
              <h5 id="chat-panel-data-labels">
                Commissioning date
                </h5>
              <h4 id="show-panel-data-fields-second">
                {props.commissioningDate}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={24}>
              <h5 id="chat-panel-data-labels-third">
                Battery description
                </h5>
              <h4 id="show-panel-data-fields-third">
                {props.batteryDescription}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={24}>
              <h5 id="chat-panel-data-labels-third">
                Installation type
                </h5>
              <h4 id="show-panel-data-fields-third">
                {props.installationType}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row id="installation-text-fields">
            <Col span={24}>
              <h5 id="chat-panel-data-labels-third">
                Observation
                </h5>
              <h4 id="show-panel-data-fields-third">
                {props.observation}
              </h4>
            </Col>
          </Row>
          {/* <div id="button-container-show-panel">
            <Button id="show-panel-edit-button" >EDIT</Button>
            <Button id="show-panel-save-button" >SAVE</Button>
          </div> */}
          <Divider />
        </Card>
      </div>
    </React.Fragment >
  )
}

export default ShowPanelDetails