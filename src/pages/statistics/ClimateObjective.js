import React from 'react'
import { Tag, Slider, Col, Row } from 'antd';
import './Statistics.css';
import axiosConfig from '../../api/axiosConfig';

const marks = {
  0: '0 Tm',
  400000: '400.000 Tm',
  800000: {
    style: {
      color: '#db4196'
    },
    label: <strong>800.000 Tm</strong>
  }
};

function formatter(value) {
  return `${value}Tm`;
}

class ClimateObjective extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minCo2: 0,
      maxCo2: 0
    };
  }

  getCo2Saving() {
    axiosConfig
      .get('/co2saving')
      .then(response => {
        this.setState({ minCo2: response.data.minCo2, maxCo2: response.data.maxCo2 });
      });
  }

  componentDidMount() {
    this.getCo2Saving();
  }

  render() {
    return (
      <React.Fragment>
        <Col>
          <Row >
            <div id="div-slider-climate">
              <Slider range marks={marks} min={0} max={800000} tipFormatter={formatter}
                value={[this.state.minCo2, this.state.maxCo2]}
                disabled />
            </div>
          </Row>
          <Row>
            <p id="small-letters-climate">The pink bar shows the approximated CO2 emissions saved by the installations registered in Generation Solar.
             This range is an estimate based on global parameters. Share new installations to get closer the climate objective!</p>
          </Row>
          <Row>
            {/* <Col xs={12} sm={12} md={12} lg={12} xl={12} >
              <div id="measurements-left">
                <Tag color="#2a4092" id="tag">13</Tag>
                <p>Total PV today</p>
              </div>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
              <div id="measurements-right">
                <Tag color="#db4196" id="tag">3</Tag>
                <p>Citizen owned PV</p>
              </div>
            </Col> */}
          </Row>
        </Col>
      </React.Fragment>
    );
  }
}

export default ClimateObjective
