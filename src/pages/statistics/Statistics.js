// import React from 'react';
// import './Statistics.css';
// import { Row, Col, Divider } from 'antd';
// import PanelsHeatMap from './PanelsHeatMap';
// import ClimateObjective from './ClimateObjective';
// import axiosConfig from '../../api/axiosConfig';

// var position = { lat: 39.8714243295929, lng: -0.06466403603553773 }

// const yerarObjective = 400 //tonnes CO2

// class Statistics extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       totalInstallations: '',
//       totalPower: ''
//     };
//   }

//   getAllInstallationsNumber() {
//     axiosConfig({
//       url: '/solarPanel/gettotalnumber',
//       method: 'GET'
//     }).then(response => {
//       this.setState({ totalInstallations: response.data });
//     });
//   }

//   getAllInstallationsPower() {
//     axiosConfig({
//       url: '/solarPanel/gettotalenergy',
//       method: 'GET'
//     }).then(response => {
//       this.setState({ totalPower: response.data });
//     });
//   }

//   // componentDidMount() {
//   //   axiosConfig
//   //     .get('/co2saving')
//   //     .then(response => {
//   //       var response = response.data;
//   //       console.log(response)
//   //     });
//   // }


//   componentDidMount() {
//     this.getAllInstallationsNumber();
//     this.getAllInstallationsPower();
//   }

//   render() {
//     document.body.classList.remove('body_forms');
//     return (
//       <React.Fragment >
//         <Row id="statistics-row">


//           <Col xs={24} sm={12} md={12} lg={12} xl={12} >
//             <div id="statistics-map-container" >
//               <PanelsHeatMap />
//             </div>
//             <div>
//               <p id="heatmap-explanation">Heat map showing the geographical distribution and amount of installed capacity of photovoltaic installations registered in Generation Solar.</p>
//             </div>
//           </Col>


//           <Col id="container-cards" xs={24} sm={12} md={12} lg={12} xl={12} >
//             <Row >
//               <div id="capacity-card-statistics-container" >
//                 <h2 id="tittle-installed">NUMBER OF INSTALLATIONS</h2>
//                 <h1 style={{ color: "#2a4092" }} id="numbers-installed">
//                   {this.state.totalInstallations}
//                 </h1>
//                 <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
//                   Photovoltaic installations registered in Generation Solar
//                 </p>
//                 <Divider />
//                 <h2 id="tittle-installed">TOTAL CAPACITY</h2>
//                 <div>
//                   <Col span={18}>
//                     <h1 style={{ color: "#2a4092" }} id="numbers-total-capacity" >
//                       {this.state.totalPower}
//                     </h1>
//                   </Col>
//                   <Col span={6}>
//                     <p id="big-letters-installed">kW</p>
//                   </Col>
//                   <Row>
//                     <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
//                       Sum of the installed capacity shared in Generation Solar.
//                   </p>
//                   </Row>
//                 </div>
//               </div>
//             </Row>
//           </Col>

//           <Col id="container-cards" span={24} xs={24} sm={12} md={12} lg={12} xl={12} >
//             <div id="climate-objective-card-statistics-container" >
//               <h2 id="tittle-installed">CLIMATE OBJECTIVE</h2>
//               <div>
//                 <Row>
//                   <h1 style={{ color: "#2a4092" }} id="numbers-climate-objective" >37</h1>
//                   <p id="letters-climate-objective">GW</p>
//                   <p id="small-letters-climate">Target 2030</p>
//                 </Row>
//               </div>
//               <ClimateObjective />
//             </div>
//           </Col>
// }
//         </Row>
//       </React.Fragment >
//     );
//   }
// }

// export default Statistics


import React from 'react';
import './Statistics.css';
import { Row, Col, Divider } from 'antd';
import PanelsHeatMap from './PanelsHeatMap';
import ClimateObjective from './ClimateObjective';
import axiosConfig from '../../api/axiosConfig';

var position = { lat: 39.8714243295929, lng: -0.06466403603553773 }

const yerarObjective = 400 //tonnes CO2

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
        <Row id="statistics-row">


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
                  <Col span={18}>
                    <h1 style={{ color: "#2a4092" }} id="numbers-total-capacity" >
                      {this.state.totalPower}
                    </h1>
                  </Col>
                  <Col span={6}>
                    <p id="big-letters-installed">kW</p>
                  </Col>
                  <Row>
                    <p style={{ color: "#bfc5d2" }} id="small-letters-installed">
                      Sum of the installed capacity shared in Generation Solar.
                  </p>
                  </Row>
                </div>
              </div>
            </Row>
          </Col>

          {/* 
          <Col id="container-cards" span={24} xs={24} sm={12} md={12} lg={12} xl={12} >
            <div id="climate-objective-card-statistics-container" >
              <h2 id="tittle-installed">CLIMATE OBJECTIVE</h2>
              <div>
                <Row>
                  <h1 style={{ color: "#2a4092" }} id="numbers-climate-objective" >37</h1>
                  <p id="letters-climate-objective">GW</p>
                  <p id="small-letters-climate">Target 2030</p>
                </Row>
              </div>
              <ClimateObjective />
            </div>
          </Col>
} */}
        </Row>
      </React.Fragment >
    );
  }
}

export default Statistics
