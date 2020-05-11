import React, { useState, useEffect, useContext, useRef } from "react"
import { Input, Button, Form, Icon, Col, Card, Row, Avatar } from 'antd';
import axiosConfig from '../../api/axiosConfig'
import './feedPanel.css'
import moment from 'moment'
import ImageSlider from '../imageSlider/ImageSlider'
import { ProfileContext } from '../../utils/profile/ProfileContext'
import ShowMapping from "../ShowMapping"
import { Link } from "react-router-dom";

//INPUT BOX AND SEND BUTTON
const FeedForm = ({ panelId, messagesList, setMessagesList }) => {

  const [message, setMessage] = useState("");

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    if (message) {
      postComment()
    }
    setMessage("")
  }
  // POST COMMENT
  function postComment() {
    const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    var body = {
      text: message,
      solarPanel:
      {
        id: panelId
      }
    }
    axiosConfig.post("/comment/", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        const dataResponse = response.data;
        let newResponse = {
          id: dataResponse.id,
          text: dataResponse.text,
          creationDate: dataResponse.creationDate,
          userID: dataResponse.userId,
          userName: dataResponse.userName,
          readed: dataResponse.readed,
          solarPanelId: panelId
        }
        setMessagesList(messagesList.concat(newResponse));
      })
      .catch(function (error) {
      });
  }
  return (
    <div id="panel-feed-container-message-box">
      <Form onSubmit={handleFormSubmit}>
        <Form.Item >
          <Input
            id="feed-input-text"
            name="input-text"
            placeholder="Type here"
            value={message}
            onChange={event => setMessage(event.target.value)}
          />
          <Button id="feed-send-button" type="submit" onClick={handleFormSubmit}>
            <Icon type="right-circle" theme="twoTone" />
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

//MESSAGES LIST
const FeedList = ({ panelId, messagesList, setMessagesList }) => {

  const profileContext = useContext(ProfileContext)
  var username = profileContext.username

  //AUTOSCROLL
  const scrollableArea = useRef(null);
  useEffect(() => {
    if (scrollableArea.current)
      scrollableArea.current.scrollTop = scrollableArea.current.scrollHeight;
  }, [messagesList]);

  //AVATAR
  const getName = (name) => {
    return name.slice(0, 2)
  }

  //INITIAL COMMENTS COMMIT
  var render = true;
  useEffect(() => {
    const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    function fetchMessages() {
      if (render) {
        axiosConfig.get('/solarPanel/' + panelId + '/comments',
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": access_token
            }
          })
          .then(response => {
            const newList = response.data;
            if (messagesList.length !== newList.length) {
              render = true;
              setMessagesList(newList);
            } else {
              render = false;
            }
          })
      }
    }
    fetchMessages()
  })

  return (
    <React.Fragment>
      <div
        id="feed-panel-messages-list"
        ref={scrollableArea}>
        {messagesList.map(message => (
          <div key={message.id}>
            {message.userName === username ?
              (<React.Fragment>
                <div>
                  <Avatar id="feed-panel-avatar">{getName(message.userName)}</Avatar>
                </div>
                <div id="feed-panel-user-booble">
                  <p id="feed-panel-text-message">{message.text}</p>
                  <h6 id="feed-panel-message-date">{moment(message.creationDate).format('DD/MM/YY')}</h6>
                  <h6 id="feed-panel-message-time">{moment(message.creationDate).format('HH:mm')}</h6>
                </div>
              </React.Fragment>
              )
              :
              (<React.Fragment>
                <div>
                  <Avatar id="another-feed-panel-avatar">{getName(message.userName)}</Avatar>
                </div>
                <div id="feed-panel-another-booble">
                  <p id="feed-panel-text-another-message">{message.text}</p>
                  <h6 id="feed-panel-message-another-date">{moment(message.creationDate).format('DD/MM/YY')}</h6>
                  <h6 id="feed-panel-message-another-time">{moment(message.creationDate).format('HH:mm')}</h6>
                </div>
              </React.Fragment>
              )}
          </div>
        ))}

      </div>
    </React.Fragment >
  )
}

const FeedPanel = (props) => {

  const [messagesList, setMessagesList] = useState([]);

  var myPanel = JSON.parse(localStorage.getItem("myPanel"))
  var myLocation = (localStorage.getItem("pathname"))
  // const myPanel = props.location.myPanel;
  // const myLocation = props.location.hash

  // function onClose() {
  //   if (myLocation === "#my-installations-sider") {
  //     props.history.push('/my-installations-sider')
  //   } else {
  //     props.history.push('/private-mapping-sider')
  //   }
  // }

  return (
    <React.Fragment>
      <Row>
        <Col span={24} xs={0} sm={0} md={24} lg={24} xl={24} >
          <ShowMapping lat={myPanel.lat} lon={myPanel.lon} />
        </Col>
      </Row>
      {/* <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}> */}
      <Card id="feed-card-container">
        <Row>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <p id="feed-card-tittle">{myPanel.installationName}</p>
            <Button id="feed-close-button" >
              <Link to={myLocation} >
                <Icon type="close" />
              </Link>
            </Button>
            <div id="feed-card-image-container">
              <ImageSlider multimedia={myPanel.multimedia} />
            </div>
          </Col >
        </Row>
        <Row>
          <Col span={8}>
            <h5 id="feed-panel-data-labels">
              Installed capacity
            </h5>
            <h4 id="feed-panel-data-fields">
              {myPanel.electrical_capacity} kW
            </h4>
          </Col>
          <Col span={8}>
            <h5 id="feed-panel-data-labels">
              Area
            </h5>
            <h4 id="feed-panel-data-fields">
              {myPanel.surface} m²
            </h4>
          </Col>
          <Col span={8}>
            <h5 id="feed-panel-data-labels">
              Inverter capacity
            </h5>
            <h4 id="feed-panel-data-fields">
              {myPanel.inverterCapacity} kW
            </h4>
          </Col>
        </Row>
        <Row >
          {/* <div id="feed-panel-user-name-container"> */}
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3 id="feed-panel-user-name" >{myPanel.username}</h3>
          </Col>
          {/* </div> */}
        </Row>
        <Row>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <div id="feed-list-container">
              <FeedList panelId={myPanel.id} messagesList={messagesList} setMessagesList={setMessagesList} />

            </div>
            {/* <div class="push"></div> */}
          </Col>
        </Row>
        <Row>
          <Col id="footer-message-box" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            {/* <div id="feed-form-container"> */}
            <FeedForm panelId={myPanel.id} messagesList={messagesList} setMessagesList={setMessagesList} />
            {/* </div> */}
          </Col>
        </Row>
      </Card>
      {/* </Col> */}
    </React.Fragment >
  );
};

export default FeedPanel