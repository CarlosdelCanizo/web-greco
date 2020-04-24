import React from 'react'
import { Tag, Slider } from 'antd';
import './Statistics.css';

const marks = {
  0: '0GW',
  17: '17GW',
  27: '27GW',
  37: {
    style: {
      color: '#db4196',
    },
    label: <strong>37GW</strong>,
  },
};

class ClimateObjective extends React.Component {

  render() {
    return (
      <React.Fragment>
        <div id="slider">
          {/* <Tooltip title="3 done / 3 in progress / 4 to do"> */}

          <div>
            <Slider range marks={marks} min={0} max={37} defaultValue={[3, 27]} id="slider-climate-objective" disabled />
          </div>

          {/* <Progress
            percent={100}
            successPercent={56}
            format={() => 'GW'}
            id="climate-objective-progress" /> */}

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