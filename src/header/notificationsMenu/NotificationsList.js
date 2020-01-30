import React, { useState, useEffect } from "react"
import { Card, Button } from 'antd'
import Header from '../Header'
import NotificationCard from './NotificationCard'
import "./notifications.css"
import axiosConfig from '../../api/axiosConfig'

function NotificationsList() {

  const [notifications, setNotifications] = useState([])
  const [idPanels, setIdPanels] = useState([])

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

  // GET NOTIFICATIONS
  const fetch = () => {
    axiosConfig.get("/comment/unreadcomments",
      {
        headers: {
          "Authorization": access_token
        }
      })
      .then(response => {
        const newList = response.data
        setNotifications(newList)
        console.log("las notificaciones:", newList)
        setIdPanels({ ...idPanels, [idPanels]: response.data })
        console.log("idPanels:", idPanels)
        // setIdPanel(newList[0].solarPanelId)
      })
  }

  // DELETE NOTIFICATIONS
  const deleteNotifications = () => {
    setNotifications([])
    // axiosConfig.get("/solarPanel/" + idPanel + "/comments",
    //   {
    //     headers: {
    //       "Authorization": access_token
    //     }
    //   })
    //   .then(response => {
    //     const newList = response.data
    //     fetch()
    //   })
  }

  useEffect(() => {
    fetch();
  }, [])

  return (
    <React.Fragment>
      <Header />
      <Card id="notification-detail">
        <div>
          {notifications.map(item => (
            <NotificationCard item={item} />
          ))}
        </div>
        <div>
          <Button id="button-clear" onClick={deleteNotifications}>
            CLEAR
        </Button>
        </div>
      </Card>
    </React.Fragment >
  )
}

export default NotificationsList