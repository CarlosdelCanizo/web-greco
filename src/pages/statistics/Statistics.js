import React from 'react';
import './Statistics.css';
import { Row, Col, Divider } from 'antd';
import PanelsHeatMap from './PanelsHeatMap';
import ClimateObjective from './ClimateObjective';
import axiosConfig from '../../api/axiosConfig';

var position = { lat: 39.8714243295929, lng: -0.06466403603553773 }

class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalInstallations: '',
      totalPower: '',
    };
  }

  getAllInstallationsNumber() {
    axiosConfig({
      url: '/solarPanel/gettotalnumber',
      method: 'GET'
    }).then(response => {
      this.setState({ totalInstallations: response.data });
    });
  }

  getAllInstallationsPower() {
    axiosConfig({
      url: '/solarPanel/gettotalenergy',
      method: 'GET'
    }).then(response => {
      var allInstallationPower = response.data;
      allInstallationPower = Math.round(allInstallationPower)
      this.setState({ totalPower: allInstallationPower });
    });
  }

  componentDidMount() {
    this.getAllInstallationsNumber();
    this.getAllInstallationsPower();
  }


  render() {
    document.body.classList.remove('body_forms');
    return (
      <React.Fragment >

        <Col xs={24} sm={12} md={12} lg={12} xl={12} >
          <div id="statistics-map-container" >
            <PanelsHeatMap />
          </div>
          <div>
            <p id="heatmap-explanation">Heat map showing the geographical distribution and amount of installed capacity of photovoltaic installations registered in Generation Solar.</p>
          </div>
        </Col>

        <Col id="container-cards" xs={24} sm={12} md={12} lg={12} xl={12} >
          <Row >
            <div id="capacity-card-statistics-container" >
              <h2 id="tittle-installed">NUMBER OF INSTALLATIONS</h2>
              <h1 style={{ color: "#2a4092" }} id="numbers-installed">
                {this.state.totalInstallations}
              </h1>
              <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
                Photovoltaic installations registered in Generation Solar
                </p>
              <Divider />
              <h2 id="tittle-installed">TOTAL CAPACITY</h2>
              <div>
                <Row>
                  <Col span={1} />
                  <Col span={22}>
                    <h1 style={{ color: "#2a4092" }} id="numbers-total-capacity" >
                      {this.state.totalPower}
                    </h1>
                    <p id="big-letters-installed">kW</p>
                  </Col>
                  <Col span={1} />
                </Row>
                <Row>
                  <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
                    Sum of the installed capacity shared in Generation Solar.
                  </p>
                </Row>
              </div>
            </div>
          </Row>
        </Col>

        <Col id="container-cards" span={24} xs={24} sm={12} md={12} lg={12} xl={12} >
          <div id="climate-objective-card-statistics-container" >
            <Col span={1} />
            <Col span={22}>
              <h2 id="tittle-installed">CLIMATE OBJECTIVE FOR 2030</h2>
              <h1 style={{ color: "#2a4092" }} id="numbers-climate-objective" >800.000</h1>
              <p id="letters-climate-objective">Tonnes of CO₂</p>
            </Col>
            <Col span={1} />
            <ClimateObjective />
          </div>
        </Col>
      </React.Fragment >
    );
  }
}

export default Statistics