import React from 'react'
import './Statistics.css';
import { Row, Col, Divider } from 'antd';
import Header from '../../header/Header'
import PanelsHeatMap from './PanelsHeatMap';
import axiosConfig from '../../api/axiosConfig'


var position = { lat: 39.8714243295929, lng: -0.06466403603553773 }


class Statistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalInstallations: '',
      totalPower: ''
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
      this.setState({ totalPower: response.data });
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
        <Header />
        <Row>
          <Col xs={24} sm={12} md={12} lg={12} xl={12} >
            <div id="statistics-map-container" >
              <PanelsHeatMap />
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
                <div id="cipher">
                  <h1 style={{ color: "#2a4092" }} id="numbers-climate-objective" >
                    {this.state.totalPower}
                  </h1>
                  <p id="letters-climate-objective">kW</p>
                  <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
                    Sum of the installed capacity shared in Generation Solar.
                  </p>

                </div>

              </div>
            </Row>
          </Col>
          {/* </div> */}
        </Row>
      </React.Fragment >
    );
  }
}

export default Statistics