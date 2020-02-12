import React, { useState, useEffect } from "react"
import { Card, Button, Row, Col, Icon, Input, Form, List, Comment, Divider } from 'antd'
import axiosConfig from '../../api/axiosConfig'
import Header from '../../header/Header'
import "./ShowPanel.css"
import { Link } from "react-router-dom";
import moment from 'moment'
import ImageSlider from '../imageSlider/ImageSlider'

const ShowPanelDetails = (props) => {

  const myPanel = props.location.myPanel

  return (
    <React.Fragment>
      <Header />
      <div id="show-panel-outside">
        <Card id="show-panel-card-container">
          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <p id="show-panel-card-tittle">{myPanel.panel.installationName}</p>
              <Link to="private-mapping">
                <Button id="show-panel-close-button">
                  <Icon type="close" />
                </Button>
              </Link>
              <div id="show-panel-card-image-container">
                <ImageSlider multimedia={myPanel.panel.multimedia} />
              </div>
            </Col >
          </Row>
          <Row>
            <div id="feed-panel-text-fields">
              <Col span={8}>
                <h5 id="show-panel-data-labels-card">
                  Electrical capacity
                </h5>
                <h4 id="show-panel-data-fields">
                  {myPanel.panel.electrical_capacity} Kw
                </h4>
              </Col>
              <Col span={8}>
                <h5 id="show-panel-data-labels-card">
                  Surface
                </h5>
                <h4 id="show-panel-data-fields">
                  {myPanel.panel.surface} m²
                </h4>
              </Col>
              <Col span={8}>
                <h5 id="show-panel-data-labels-card">
                  Inverter capacity
                </h5>
                <h4 id="show-panel-data-fields">
                  {myPanel.panel.inverterCapacity} Kw
                </h4>
              </Col>
            </div>
            <Row >
              <div id="feed-panel-user-name-container">
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                  <h3 id="feed-panel-user-name" >{myPanel.panel.username}</h3>
                </Col>
              </div>
            </Row>
          </Row>
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels-first">
                Installation property
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.installationProperty}
              </h4>
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels-first">
                Technollogy used
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.technologyUsed}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Tracking orientation
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.panelTrackingOrientation ? (<p>Yes</p>) : (<p>No</p>)}
              </h4>
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Tracking inclination
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.panelTrackingInclination ? (<p>Yes</p>) : (<p>No</p>)}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Orientation
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.orientation}°
                </h4>
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Inclination
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.inclination}°
                </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Battery
                </h5>
              {myPanel.panel.battery ?
                (<h4 id="show-panel-data-fields-second">
                  Yes
                </h4>)
                :
                (<h4 id="show-panel-data-fields-second">
                  No
                </h4>)
              }
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Commissioning date
                </h5>
              <h4 id="show-panel-data-fields-second">
                {moment(myPanel.panel.commissioningDate).format('YYYY-MM-DD')}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={24}>
              <h5 id="show-panel-data-labels-third">
                Battery description
                </h5>
              <h4 id="show-panel-data-fields-third">
                {myPanel.panel.batteryDescription}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={24}>
              <h5 id="show-panel-data-labels-third">
                Installation type
                </h5>
              <h4 id="show-panel-data-fields-third">
                {myPanel.panel.installationType}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={24}>
              <h5 id="show-panel-data-labels-third">
                Observation
                </h5>
              <h4 id="show-panel-data-fields-third">
                {myPanel.panel.observation}
              </h4>
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment >
  )
}

export default ShowPanelDetails