import React, { useState, useEffect } from "react"
import { Card, Button, Row, Col, Icon } from 'antd'
import PrivateMapping from '../../pages/mapping/PrivateMapping'
import NotificationCard from './NotificationCard'
import "./notifications.css"
import axiosConfig from '../../api/axiosConfig'
import { Link } from 'react-router-dom'

var idNotificacion

function NotificationsList() {

  const [notifications, setNotifications] = useState([])


  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  var isDisabled = false

  // GET NOTIFICATIONS
  useEffect(() => {
    const fetchNotifications = () => {
      axiosConfig.get("/comment/unreadcomments",
        {
          headers: {
            "Authorization": access_token
          }
        })
        .then(response => {
          const dataResponse = response.data
          idNotificacion = response.data[response.data.length - 1]
          setNotifications(dataResponse)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    fetchNotifications();
  }, [])


  // DELETE NOTIFICATIONS
  const deleteNotifications = () => {

    let idPanel = notifications[0].idPanel

    axiosConfig.get("/solarPanel/" + idNotificacion.id + "/comments",
      {
        headers: {
          "Authorization": access_token
        }
      })
      .then(response => {
        const responseData = response.data
        setNotifications([]);

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <Row>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} >
          <PrivateMapping />
        </Col>
      </Row>
      <Card id="notification-detail">
        <Link to={(access_token === null || access_token === "Bearer null") ? ("/public-mapping-sider") : ("/private-mapping-sider")}>
          <Button id="notifications-close-button">
            <Icon type="close" id="icon-x" />
          </Button>
        </Link>
        <div>
          {access_token === "Bearer null" || access_token === "Bearer undefined" ?
            (<p id="no-notifications">You must be logged to view your notifications</p>) : (null)}
          {notifications.length === 0 && access_token !== "Bearer null" && access_token !== "Bearer undefined" ?
            (isDisabled = true, <p id="no-notifications">You don´t have new notifications</p>)
            :
            (null)}
          {notifications.map(item => (
            <NotificationCard key={item.id} item={item} />
          ))}
        </div>
        <div>
          <Button id="button-clear" onClick={deleteNotifications} disabled={isDisabled}>
            CLEAR
        </Button>
        </div>
      </Card>
    </React.Fragment >
  )
}

export default NotificationsList