import React, { useState, useEffect } from "react"
import { Card, Button } from 'antd'
import Header from '../Header'
import NotificationCard from './NotificationCard'
import "./notifications.css"
import axiosConfig from '../../api/axiosConfig'

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
          setNotifications(dataResponse)
          console.log("access_token", access_token)
        })
        .catch(function (error) {
          console.log(error);
          console.log("access_token", access_token)
        });
    }
    fetchNotifications();
  }, [])


  // DELETE NOTIFICATIONS
  const deleteNotifications = () => {
    let idPanel = notifications[0].idPanel
    axiosConfig.get("/solarPanel/" + idPanel + "/comments",
      {
        headers: {
          "Authorization": access_token
        }
      })
      .then(response => {
        const responseData = response.data
        console.log("El responseDatata de los comentarios para que se borren", responseData)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <React.Fragment>
      <Header />
      <Card id="notification-detail">
        <div>
          {notifications.length === 0 ?
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