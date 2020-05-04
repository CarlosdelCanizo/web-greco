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
        <Row >
          <Col>
            <div id="div-slider-climate">
              <Slider range marks={marks} min={0} max={800000} tipFormatter={formatter}
                value={[this.state.minCo2, this.state.maxCo2]}
                disabled />
            </div>
          </Col>
          <Col>
            <div id="div-slider-climate-explanation">
              <p id="small-letters-climate">The pink bar shows the approximated CO2 emissions saved by the installations registered in Generation Solar.
             This range is an estimate based on global parameters. Share new installations to get closer the climate objective!</p>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default ClimateObjective
