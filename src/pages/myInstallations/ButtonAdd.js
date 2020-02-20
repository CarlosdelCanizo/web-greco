import React from 'react'
import { Card, Button, Row, Col, Icon } from 'antd';
import './MyInstallations.css';
import { Link } from "react-router-dom";
import noImage from '../../assets/no-image.svg'
import solar from '../../assets/solar.jpg'


function ButtonAdd() {

  function addNewPanel() {
    localStorage.setItem('currentPanelId', JSON.stringify(0))
    localStorage.removeItem("currentPanelState")
  }

  return (
    <Col span={4} xs={24} sm={24} md={24} lg={24} xl={24}>
      <Card id="installation-add">
        <Link to="/first">
          <Button type="link" shape="circle" size="large" icon="plus" id="installation-add-button" onClick={addNewPanel} />
        </Link>
        <p id="add-installation-text-button">Add installation</p>
      </Card>
    </Col>
  );

}

export default ButtonAdd