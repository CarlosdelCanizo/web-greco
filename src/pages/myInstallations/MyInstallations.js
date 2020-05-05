import React from 'react'
import { Row, Col } from 'antd';
import './MyInstallations.css';
import PanelList from './PanelList';
import ButtonAdd from './ButtonAdd'

function MyInstallations() {
  document.body.classList.remove('body_forms');
  return (
    <React.Fragment>
      {/* <div id="background-installations"> */}
      <Row id="background-row" >
        <Col span={24} xs={24} sm={24} md={6} lg={5} xl={4} xxl={4}>
          <ButtonAdd />
        </Col>
        <Col id="background-panel-list" span={24} xs={24} sm={24} md={18} lg={19} xl={20} xxl={20}>
          <PanelList />
        </Col>
      </Row>
      {/* </div> */}
    </React.Fragment >
  );
}

export default MyInstallations