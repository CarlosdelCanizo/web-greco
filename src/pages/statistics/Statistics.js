import React from 'react'
import './Statistics.css';
import { Row, Col } from 'antd';
import Header from '../../header/Header'
import ClimateObjective from './ClimateObjective'
import PanelsHeatMap from './PanelsHeatMap';


var position = { lat: 39.8714243295929, lng: -0.06466403603553773 }

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   addressPoints: [],
    //   isLoading: false,
    //   error: null,
    // };
  }

  render() {
    return (
      <React.Fragment >
        <Header />
        <Row>
          <div id="background-statistics">
            <Col span={24} xs={24} sm={12} md={12} lg={12} xl={12} >
              <div id="statistics-map-container" >
                <PanelsHeatMap />
              </div>
            </Col>
            <Col id="container-cards" span={24} xs={24} sm={12} md={12} lg={12} xl={12} >
              <div id="capacity-card-statistics-container" >
                <h2 id="tittle-installed">ROOFTOP PV INSTALLED CAPACITY</h2>
                <h1 style={{ color: "#2a4092" }} id="numbers-installed">500</h1><p id="big-letters-installed"> MW</p>
                <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut tincidunt est vel diam tincidunt tristique
                </p>
              </div>
            </Col>
            <Col id="container-cards" span={24} xs={24} sm={12} md={12} lg={12} xl={12} >
              <div id="climate-objective-card-statistics-container" >
                <h2 id="tittle-installed">CLIMATE OBJECTIVE</h2>
                <div id="cipher">
                  <h1 style={{ color: "#2a4092" }} id="numbers-climate-objective" >37</h1>
                  <p id="letters-climate-objective">GW</p>
                  <p id="small-letters-climate">Target 2030</p>
                </div>
                <ClimateObjective />
              </div>
            </Col>
          </div>
        </Row>
      </React.Fragment >
    );
  }
}

export default Statistics