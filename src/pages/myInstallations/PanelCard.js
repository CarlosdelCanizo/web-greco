import React, { useContext } from 'react'
import { Card, Button, Row, Col, Icon, Popover, Popconfirm } from 'antd';
import './MyInstallations.css';
import { Link } from "react-router-dom";
import noImage from '../../assets/no-image.svg'
import solar from '../../assets/solar.jpg'
import axiosConfig from '../../api/axiosConfig'

import PanelContext from '../../context/Context'

function PanelCard({ panel }) {

  const { deletePanel, panels } = useContext(PanelContext)
  const { id, installationName, electrical_capacity, surface, inverterCapacity } = panel

  const text = 'Are you sure to delete this installation?';

  function confirm() {
    onDeleteClick()
    console.log("El context?", panels)
  }

  function onDeleteClick() {
    deleteSolarPAnel(id)
    return deletePanel(id);
  }

  const textMenu = <span id="popover-panels">INSTALLATION</span>;
  const content = (
    <div id="popover-panels">
      <Link to="/show-panel-details">
        <Button id="popover-menu-panels">More details</Button>
      </Link>
      <Link to="/feed-panel">
        <Button id="popover-menu-panels">Feed</Button>
      </Link>
      <Popconfirm
        placement="leftBottom"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      ><Button id="popover-menu-panels">Delete</Button>
      </Popconfirm>
      <Button id="popover-menu-panels">Edit</Button>
    </div>
  );

  //DELETE SOLAR PANEL
  function deleteSolarPAnel(id) {
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    axiosConfig.delete("http://10.0.10.195:8088/solarPanel/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(result => console.log("Panel Borrado:", result));
  }

  return (
    <Col span={24} xs={24} sm={24} md={24} lg={12} xl={12}>
      <Card id="installation-container">
        <Row>
          <Col span={24} xs={24} sm={24} md={10} lg={10} xl={10}>
            <p id="installation-tittle">{installationName}</p>
            <div id="installation-button-container">

              <Popover placement="left" title={textMenu} content={content} trigger="click">
                <Button id="installation-button">
                  <Icon type="more" />
                </Button>
              </Popover>

            </div>
          </Col>
          <img src={solar} alt="image" id="installation-add-image" />
          <div id="installation-text-fields">
            <Col span={8}>
              <h5 id="panel-data-labels">
                Electrical capacity
                  </h5>
              <h4 id="panel-data-fields">
                {electrical_capacity} Kw
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Surface
                  </h5>
              <h4 id="panel-data-fields">
                {surface} m²
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Inverter capacity
                  </h5>
              <h4 id="panel-data-fields">
                {inverterCapacity} Kw
                  </h4>
            </Col>
          </div>
        </Row>
      </Card>
    </Col>
  );
}

export default PanelCard