import React from 'react'
import { Slider, Tag } from 'antd';
import './Statistics.css';

const marks = {
  3: '3GW',
  13: '13GW',
  37: '37GW',
  37: {
    style: {
      color: '#f50',
    },
    label: <strong>37GW</strong>,
  },
};

class ClimateObjective extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div id="slider">
          <Slider range marks={marks} defaultValue={[3, 13]} max={37} />
        </div>
        <div id="measurements-left">
          <Tag color="#2a4092" id="tag">13</Tag>
          <p>Total PV today</p>
        </div>
        <div id="measurements-right">
          <Tag color="#db4196" id="tag">3</Tag>
          <p>Citizen owned PV</p>
        </div>
      </React.Fragment>
    );
  }
}

export default ClimateObjective