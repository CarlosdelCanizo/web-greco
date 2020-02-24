import React, { useContext } from 'react'
import { Row, Col } from 'antd';
import './MyInstallations.css';
import Header from '../../header/Header'
import PanelList from './PanelList';
import ButtonAdd from './ButtonAdd'

function MyInstallations() {
  document.body.classList.remove('body_forms');
  return (
    <React.Fragment>
      <Header />

      <div id="background-installations">
        <Row id="background-row" >
          <Col span={24} xs={24} sm={24} md={5} lg={6} xl={6}>
            <ButtonAdd />
          </Col>
          <Col span={24} xs={24} sm={24} md={19} lg={18} xl={18}>
            <PanelList />
          </Col>
        </Row>
      </div>
    </React.Fragment >
  );
}

export default MyInstallations