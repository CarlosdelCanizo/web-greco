// import React, { useState, useEffect } from "react"
// import { Card, Button, Row, Col, Icon, Input, Form, List, Comment } from 'antd'
// import solar from '../../../assets/solar.jpg'
// import axios from 'axios'
// import Header from '../../../components/header/Header'
// import "./ChatPanel.css"
// import '../../../pages/myInstallations/MyInstallations.css'
// import moment from 'moment'
// import { Link } from "react-router-dom";
// import PanelContext from '../../../context/Context'

// const { TextArea } = Input;

// const CommentList = ({ comments }) => (
//   <List
//     dataSource={comments}
//     itemLayout="horizontal"
//     renderItem={props => <Comment {...props} id="chat-panel-user-booble" />}
//   />
// );

// const Editor = ({ onChange, onSubmit, submitting, value }) => (
//   <div>
//     <Form.Item >
//       <TextArea rows={4} onChange={onChange} value={value} id="chat-panel-input-message-box" />
//     </Form.Item>
//     <Form.Item>
//       <Button htmlType="submit" loading={submitting} onClick={onSubmit} id="chat-panel-send-button" >
//         <Icon type="right-circle" theme="twoTone" />
//       </Button>
//     </Form.Item>
//   </div>
// );
// // var panel, installationName, electricalCapacity, surface, inverterCapacity
// // const { id, installationName, electricalCapacity, surface, inverterCapacity } = panel

// class ChatPanel extends React.Component {
//   state = {
//     comments: [],
//     submitting: false,
//     value: '',
//   };

//   handleSubmit = () => {
//     if (!this.state.value) {
//       return;
//     }

//     this.setState({
//       submitting: true,
//     });

//     setTimeout(() => {
//       this.setState({
//         submitting: false,
//         value: '',
//         comments: [
//           {
//             author: <p style={{ color: "#db4196" }}>Txema Sanchis</p>,
//             content: <p>{this.state.value}</p>,
//             datetime: moment().fromNow(),
//           },
//           ...this.state.comments,
//         ],
//       });
//     }, 1000);
//   };

//   handleChange = e => {
//     this.setState({
//       value: e.target.value,
//     });
//   };


//   //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
//   //     var panelId = 69
//   //     var page = 0
//   //     var size = 20
//   //     var params = {
//   //     page: 'page=' + page,
//   //     size: '&size=' + size
//   // }

//   // // INITIAL COMMENTS COMMIT ASYNC
//   // const [data, setData] = useState([]);
//   // useEffect(() => {

//   //     const fetchData = async () => {
//   //         const result = await axios(
//   //             'http://10.0.10.195:8088/solarPanel/' + panelId + '/comments?', (params),
//   //             {
//   //                 headers: {
//   //                     "Content-Type": "application/json",
//   //                     "Authorization": access_token
//   //                 }
//   //             }
//   //         );

//   //         setData([{ hola: 'hola' }]);
//   //         console.log("El result.data:", result.data.content)
//   //         console.log("El data:", data)
//   //     };
//   //     fetchData();
//   // }, []);

//   //GET ALL COMMENTS FROM PANEL
//   // function getAllComments() {
//   //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
//   //     axios.get('http://10.0.10.195:8088/solarPanel/' + panelId + '/comments?', (params),
//   //         {
//   //             headers: {
//   //                 "Content-Type": "application/json",
//   //                 "Authorization": access_token
//   //             }
//   //         })
//   //         .then(response => {
//   //             if (response.status === 200) {
//   //                 setData(response.data.content)
//   //                 console.log("Raw response:",response.data.content);
//   //                 console.log("Contingut:", data)
//   //             }
//   //         })
//   //         .catch(function (error) {
//   //             console.log(error);
//   //         });
//   // }
//   // useEffect(() => {
//   //     getAllComments();
//   // }, []);

//   //GET COMMENT
//   // function getComment() {
//   //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
//   //     axios.post("http://10.0.10.195:8088/comment/" + (Response.id),
//   //         {
//   //             headers: {
//   //                 "Content-Type": "application/json",
//   //                 "Authorization": access_token
//   //             }
//   //         })
//   //         .then(response => {
//   //             if (response.status === 200) {
//   //                 setMessage([response.data])
//   //                 console.log(response);
//   //             }
//   //         })
//   //         .catch(function (error) {
//   //             console.log(error);
//   //         });
//   // }

//   // POST COMMENT
//   // function postComment() {
//   //     var body = {
//   //         text: data.textComment,
//   //         solarPanel:
//   //         {
//   //             id: "69"
//   //         }
//   //     }
//   //     axios.post("http://10.0.10.195:8088/comment/", (body),
//   //         {
//   //             headers: {
//   //                 "Content-Type": "application/json",
//   //                 "Authorization": access_token
//   //             }
//   //         })
//   //         .then(response => {
//   //             const dataResponse = response.data;
//   //             // setMessage({
//   //             //     id: response.data.id,
//   //             //     text: response.data.text,
//   //             //     creationDate: response.data.creationDate         
//   //             // });

//   //             // setMessagesList(message)
//   //             console.log("Nou DATA:", dataResponse)
//   //             // console.log("Missatge", message)
//   //             console.log("Response a seques", response)
//   //             console.log("Response data", response.data)

//   //         })
//   //         .catch(function (error) {
//   //             console.log(error);
//   //         });
//   // }

//   render() {

//     const { comments, submitting, value } = this.state;

//     return (
//       <React.Fragment>
//         <Header />
//         <div id="chat-panel-exterior-background">
//           <Card id="chat-panel-container">
//             <Row>
//               <Col span={24} xs={24} sm={24} md={10} lg={10} xl={10}>
//                 <p id="installation-tittle">{installationName}</p>
//                 <div id="installation-button-container">
//                   {/* <Link to="/private-mapping">
//                                         <Button id="chat-panel-close-button">
//                                             <Icon type="close" />
//                                         </Button>
//                                     </Link> */}
//                 </div>
//               </Col>
//               <img src={solar} height="300" width="450" alt="image" id="installation-add-image" />
//               <div id="installation-text-fields">
//                 <Col span={8}>
//                   <h5 id="panel-data-labels">
//                     Electrical capacity
//                   </h5>
//                   <h4 id="panel-data-fields">
//                     {electricalCapacity} Kw
//                   </h4>
//                 </Col>
//                 <Col span={8}>
//                   <h5 id="panel-data-labels">
//                     Surface
//                   </h5>
//                   <h4 id="panel-data-fields">
//                     {surface} m²
//                   </h4>
//                 </Col>
//                 <Col span={8}>
//                   <h5 id="panel-data-labels">
//                     Inverter capacity
//                   </h5>
//                   <h4 id="panel-data-fields">
//                     {inverterCapacity} Kw
//                   </h4>
//                 </Col>
//               </div>
//             </Row>
//             <Row>
//               <h3 id="chat-panel-user-name" >Txema Sanchis</h3>
//             </Row>

//             <div id="chat-panel-messages">
//               {comments.length > 0 && <CommentList comments={comments} />}
//             </div>
//             <div id="chat-panel-input-form">
//               <Comment
//                 content={
//                   <Editor
//                     onChange={this.handleChange}
//                     onSubmit={this.handleSubmit}
//                     submitting={submitting}
//                     value={value}
//                   />
//                 }
//               />
//             </div>
//           </Card>
//         </div>
//       </React.Fragment >
//     )
//   }
// }

// export default ChatPanel