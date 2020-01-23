import React, { useState, useEffect } from "react"
import { Input, Button, List, Comment, Form, Icon, message } from 'antd';
import solar from '../../assets/solar.jpg'
import axios from 'axios'
import Header from '../../header/Header'
import './feedPanel.css'
import moment from 'moment'
import { Link } from "react-router-dom";
import PanelCard from '../../pages/myInstallations/PanelCard'

const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
const panelId = '69'

const FeedForm = (props) => {

  let panelId = props.panelId
  console.log(panelId)

  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([])
  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    if (message) {
      setMessagesList(messagesList.concat(message))
      postComment()
    }
    setMessage("")

  }
  // POST COMMENT
  function postComment() {
    var body = {
      text: message,
      solarPanel:
      {
        id: "69"
      }
    }
    axios.post("http://10.0.10.195:8088/comment/", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        const dataResponse = response.data;
      })
      .catch(function (error) {
        console.log(error);
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

const FeedList = () => {
  // INITIAL COMMENTS COMMIT ASYNC
  const [messagesList, setMessagesList] = useState([]);
  var params = {
    size: 50,
    page: 0
  }
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://10.0.10.195:8088/solarPanel/' + 69 + '/comments?', (params),
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        }
      );

      setMessagesList(result.data.content);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div id="feed-panel-messages-list">
        {messagesList.map(messages => (
          <div key={messages.id} >
            <div>{message.username}</div>
            <div id="feed-panel-user-booble">
              <p id="feed-panel-text-message">{messages.text}</p>
              <h6 id="feed-panel-message-date">{moment(messages.creationDate).format('DD/MM/YYYY')}</h6>
              <h6 id="feed-panel-message-time">{moment(messages.creationDate).format('HH:mm')}</h6>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment >
  )
}

const FeedPanel = () => {
  return (
    <React.Fragment>
      <Header />
      {/* <PanelCard /> */}
      <div id="panel-feed-outside">
        <div id="panel-feed-inside">
          <FeedList />
          <FeedForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeedPanel