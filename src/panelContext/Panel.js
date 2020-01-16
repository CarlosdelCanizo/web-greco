// import React, { useState, useEffect } from "react"
// import { Card, Button, Row, Col, Icon, Divider, Collapse } from 'antd'
// import solar from '../assets/solar.jpg'
// import axios from 'axios'
// import Header from '../components/header/Header'
// import "./panel.css"
// import { Link } from "react-router-dom";
// // import { PanelContext } from './PanelStore/PanelContext'

// const Panel = () => {

//   function callback(key) {
//     console.log(key);
//   }

//   // const [state, dispatch] = useContext(PanelContext);
//   const [data, setData] = useState({})

//   var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
//   useEffect(() => {
//     async function fetchData() {
//       const res = await axios.get('http://10.0.10.195:8088/solarPanel/69',
//         {
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": access_token
//           }
//         })
//       throw res
//         .then(res => {
//           setData(res.data)
//           console.log("PANEL from server:res", res.data)
//           console.log("PANEL from server:data", data)
//           // dispatch({type: 'SET_POSTS', payload: postsData});
//         })
//         .catch(error => {
//           // dispatch({ type: 'SET_ERROR', payload: error });
//           console.log("ERROR:", error)
//         });

//     }
//     fetchData();
//   }, [])

//   return (
//     <React.Fragment>
//       <div id="chat-panel-exterior-background">
//         <Card id="chat-panel-container">
//           <Row>
//             <Col span={24} id="show-panel-installation-name">
//               <p>{data.installationName}</p>
//               <Link to="/private-mapping">
//                 <Button id="chat-panel-close-button">
//                   <Icon type="close" />
//                 </Button>
//               </Link>
//             </Col>
//           </Row>
//           <Row>
//             <Col span={24}>
//               <img src={solar} height="250" width="423" alt="image" id="installation-panel-image" />
//             </Col>
//           </Row>
//           <Divider id="show-panel-divider" />
//           <Row id="installation-text-fields">
//             <Col span={8}>
//               <h5 id="chat-panel-data-labels">
//                 Electrical capacity
//                 </h5>
//               <h4 id="show-panel-data-fields">
//                 {data.electricalCapacity} Kw
//               </h4>
//             </Col>
//             <Col span={8}>
//               <h5 id="chat-panel-data-labels">
//                 Surface
//                 </h5>
//               <h4 id="show-panel-data-fields">
//                 {data.surface} Kw
//                 </h4>
//             </Col>
//             <Col span={8}>
//               <h5 id="chat-panel-data-labels">
//                 Inverter capacity
//                 </h5>
//               <h4 id="show-panel-data-fields">
//                 {data.inverterCapacity} Kw
//                 </h4>
//             </Col>
//           </Row>

//           {/* <Collapse onChange={callback}> */}
//           <Panel header="Show more data" key="1">
//             <Divider id="show-panel-divider" />
//             <Row id="installation-text-fields">
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Installation property
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.installationProperty}
//                 </h4>
//               </Col>
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Technollogy used
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.technologyUsed}
//                 </h4>
//               </Col>
//             </Row>
//             <Divider id="show-panel-divider" />
//             <Row id="installation-text-fields">
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Tracking orientation
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.panelTrackingOrientation}
//                 </h4>
//               </Col>
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Tracking inclination
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.panelTrackingIncliation}
//                 </h4>
//               </Col>
//             </Row>
//             <Divider id="show-panel-divider" />
//             <Row id="installation-text-fields">
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Orientation
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.orientation} °
//                 </h4>
//               </Col>
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Inclination
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.inclination} °
//                 </h4>
//               </Col>
//             </Row>
//             <Divider id="show-panel-divider" />
//             <Row id="installation-text-fields">
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Battery
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.battery}
//                 </h4>
//               </Col>
//               <Col span={12}>
//                 <h5 id="chat-panel-data-labels">
//                   Commissioning date
//                 </h5>
//                 <h4 id="show-panel-data-fields-second">
//                   {data.commissioningDate}
//                 </h4>
//               </Col>
//             </Row>
//             <Divider id="show-panel-divider" />
//             <Row id="installation-text-fields">
//               <Col span={24}>
//                 <h5 id="chat-panel-data-labels-third">
//                   Battery description
//                 </h5>
//                 <h4 id="show-panel-data-fields-third">
//                   {data.batteryDescription}
//                 </h4>
//               </Col>
//             </Row>
//             <Divider id="show-panel-divider" />
//             <Row id="installation-text-fields">
//               <Col span={24}>
//                 <h5 id="chat-panel-data-labels-third">
//                   Installation type
//                 </h5>
//                 <h4 id="show-panel-data-fields-third">
//                   {data.installationType}
//                 </h4>
//               </Col>
//             </Row>
//             <Divider id="show-panel-divider" />
//             <Row id="installation-text-fields">
//               <Col span={24}>
//                 <h5 id="chat-panel-data-labels-third">
//                   Observation
//                 </h5>
//                 <h4 id="show-panel-data-fields-third">
//                   {data.observation}
//                 </h4>
//               </Col>
//             </Row>
//             <div id="button-container-show-panel">
//               <Link to="/feed-panel">
//                 <Icon type="message" id="link-to-chat" />
//               </Link>
//               <Button id="show-panel-edit-button" >EDIT</Button>
//               <Button id="show-panel-save-button" >SAVE</Button>
//             </div>
//           </Panel>
//           {/* </Collapse> */}
//         </Card>
//       </div>
//     </React.Fragment >
//   )
// }

// export default Panel