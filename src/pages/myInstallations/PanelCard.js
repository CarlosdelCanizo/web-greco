import React from 'react'
import { Card, Button, Row, Col, Icon, Popover, Popconfirm } from 'antd';
import './MyInstallations.css';
import { Link } from "react-router-dom";

import axiosConfig from '../../api/axiosConfig'
import CardSlider from './CardSlider'

const PanelCard = ({ panel, fetchPanels }) => {

  function updatePanelId() {
    localStorage.setItem('currentPanelId', JSON.stringify(panel.id))
  }

  const text = 'Are you sure to delete this installation?';
  function confirm() {
    onDeleteClick()
  }

  function onDeleteClick() {
    deleteSolarPanel(panel.id)

  }

  const textMenu = <span id="popover-panels">INSTALLATION</span>;
  const content = (
    <div id="popover-panels">
      <Link to={
        {
          pathname: "/show-panel-details",
          myPanel: { panel }
        }
      }>

        <Button id="popover-menu-panels">More details</Button>
      </Link>
      <Link to={
        {
          pathname: "/feed-panel",
          myPanel: { panel }
        }
      }>
        <Button id="popover-menu-panels">Feed</Button>
      </Link>

      <Popconfirm
        placement="leftBottom"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button id="popover-menu-panels">Delete</Button>
      </Popconfirm>

      <Link to={
        {
          pathname: "/first",
          myPanel: { panel }
        }
      }>
        <Button id="popover-menu-panels" onClick={updatePanelId}>Edit</Button>
      </Link>
    </div>
  );

  //DELETE SOLAR PANEL
  function deleteSolarPanel(id) {
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    axiosConfig.delete("/solarPanel/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(result => {
        fetchPanels();
      });
  }

  return (
    <Col span={24} xs={24} sm={24} md={24} lg={12} xl={12}>
      <Card id="installation-container">
        <Row>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          </Col>
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <div id="installation-tittle-button-container">
              <p id="installation-tittle">{panel.installationName}</p>

            </div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
            <Popover placement="left" title={textMenu} content={content} trigger="click">
              <Button id="installation-button-menu">
                <Icon type="more" />
              </Button>
            </Popover>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <div id="installation-add-image-container">
              <CardSlider multimedia={panel.multimedia} />
            </div>
          </Col>
        </Row>
        <Row>
          <div id="installation-text-fields">
            <Col span={8}>
              <h5 id="panel-data-labels">
                Electrical capacity
                  </h5>
              <h4 id="panel-data-fields">
                {panel.electrical_capacity} Kw
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Surface
                  </h5>
              <h4 id="panel-data-fields">
                {panel.surface} m²
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Inverter capacity
                  </h5>
              <h4 id="panel-data-fields">
                {panel.inverterCapacity} Kw
                  </h4>
            </Col>
          </div>
        </Row>
      </Card>
    </Col >
  );
}

export default PanelCard