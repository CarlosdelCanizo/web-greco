import React from "react"
import { Card, Row, Col, Divider, Avatar, Badge, Button } from 'antd'
import "./notifications.css"

function NotificationCard() {

  // const [notifications, setNotifications] = useState([])

  // var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       'http://10.0.10.195:8088/comments/unreadcomments',
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": access_token
  //         }
  //       }
  //     );
  //     setNotifications(result.data);
  //   };
  //   fetchData();
  //   console.log("Notificaions from server:", notifications)
  // }, []);

  return (
    <React.Fragment>
      <Card id="notification-detail">
        <Row>
          <Col span={4} xs={4} sm={4} md={4} lg={4} xl={4}>
            <div id="notification-icon">
              <Badge count={1}>
                <Avatar shape="circle" icon="message" />
              </Badge>
            </div>
          </Col>
          <Col span={20} xs={20} sm={20} md={20} lg={20} xl={20}>
            <h1 id="notification-type">CHAT</h1>
            <p id="notification-content">Buenas, que modelo de placa tienes?</p>
            <h4 id="notification-time">Hace 20m</h4>
          </Col>
          <Divider />
        </Row>
        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
          <Button id="button-clear">
            CLEAR
        </Button>
        </Col>
      </Card>
    </React.Fragment >
  )
}

export default NotificationCard