import React, { useState, useEffect, useContext } from "react"
import { Input, Button, Form, Icon, Col, Card, Row, Avatar } from 'antd';
import axiosConfig from '../../api/axiosConfig'
import Header from '../../header/Header'
import './feedPanel.css'
import moment from 'moment'
import { Link } from "react-router-dom";
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import { ProfileContext } from '../../utils/profile/ProfileContext'

const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="image"
        id="feed-card-no-image-panel"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="image"
          id="feed-card-panel-image"
        />
      );
    }
  }
};

//INPUT BOX AND SEND BUTTON
const FeedForm = ({ panelId }) => {

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

//MESSAGES LIST
const FeedList = ({ panelId }) => {

  const profileContext = useContext(ProfileContext)
  var username = profileContext.username

  const [messagesList, setMessagesList] = useState([]);

  //AVATAR
  const getName = (name) => {
    return name.slice(0, 2)
  }

  //INITIAL COMMENTS COMMIT
  useEffect(() => {

    const fetchMessages = () => {
      axiosConfig
        .get('/solarPanel/' + panelId + '/comments',
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": access_token
            }
          }
        )
        .then(response => {
          const newList = response.data
          // if (newList !== messagesList)
          setMessagesList(newList);

        })
    }
    fetchMessages();
    console.log("Loop?", messagesList)
  }, [])


  return (
    <React.Fragment>
      <div id="feed-panel-messages-list">
        {messagesList.map(item => (
          <div key={item.id}>
            {item.userName === username ?
              (<React.Fragment>
                <div>
                  <Avatar id="feed-panel-avatar">{getName(item.userName)}</Avatar>
                </div>
                <div id="feed-panel-user-booble">
                  <p id="feed-panel-text-message">{item.text}</p>
                  <h6 id="feed-panel-message-date">{moment(item.creationDate).format('DD/MM/YYYY')}</h6>
                  <h6 id="feed-panel-message-time">{moment(item.creationDate).format('HH:mm')}</h6>
                </div>
              </React.Fragment>
              )
              :
              (<React.Fragment>
                <div>
                  <Avatar id="another-feed-panel-avatar">{getName(item.userName)}</Avatar>
                </div>
                <div id="feed-panel-another-booble">
                  <p id="feed-panel-text-another-message">{item.text}</p>
                  <h6 id="feed-panel-message-another-date">{moment(item.creationDate).format('DD/MM/YYYY')}</h6>
                  <h6 id="feed-panel-message-another-time">{moment(item.creationDate).format('HH:mm')}</h6>
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

  const myPanel = props.location.myPanel
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    function getImage(id) {
      axiosConfig({
        url: '/multimedia/' + id + '/getImage/',
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setImageUrl(url);
      });
    }
    if ([myPanel.item.multimedia] && [myPanel.item.multimedia.length] > 0) {
      getImage([myPanel.item.multimedia[0].id]);
    } else {
      setImageUrl('no-image');
    }
  }, []);

  return (

    <React.Fragment>
      <Header />
      <div id="panel-feed-outside">
        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card id="feed-card-container">
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <p id="feed-card-tittle">{myPanel.item.installationName}</p>
                <div id="installation-button-container">
                  <Link to="private-mapping">
                    <Button id="feed-close-button">
                      <Icon type="close" />
                    </Button>
                  </Link>
                </div>
                <div id="feed-card-image-container">
                  <PanelImage imageUrl={imageUrl} />
                </div>
              </Col >
            </Row>
            <Row>
              <div id="feed-panel-text-fields">
                <Col span={8}>
                  <h5 id="panel-data-labels">
                    Electrical capacity
                  </h5>
                  <h4 id="panel-data-fields">
                    {myPanel.item.electrical_capacity} Kw
                  </h4>
                </Col>
                <Col span={8}>
                  <h5 id="panel-data-labels">
                    Surface
                  </h5>
                  <h4 id="panel-data-fields">
                    {myPanel.item.surface} m²
                  </h4>
                </Col>
                <Col span={8}>
                  <h5 id="panel-data-labels">
                    Inverter capacity
                  </h5>
                  <h4 id="panel-data-fields">
                    {myPanel.item.inverterCapacity} Kw
                  </h4>
                </Col>
              </div>
            </Row>
            <Row >
              <div id="feed-panel-user-name-container">
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                  <h3 id="feed-panel-user-name" >Txema Sanchis</h3>
                </Col>
              </div>
            </Row>
            <Row>
              <div id="feed-list-container">
                <FeedList panelId={myPanel.item.id} />
              </div>
            </Row>
            <Row>
              <div id="feed-form-container">
                <FeedForm panelId={myPanel.item.id} />
              </div>
            </Row>
          </Card>
        </Col>
      </div>
    </React.Fragment >
  );
};

export default FeedPanel