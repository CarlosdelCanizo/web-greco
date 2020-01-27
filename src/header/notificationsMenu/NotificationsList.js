import React, { useState, useEffect } from "react"
import { Card, Row, Col, Divider, Avatar, Badge, Button } from 'antd'
import Header from '../Header'
import NotificationCard from './NotificationCard'
import "./notifications.css"
import axiosConfig from '../../api/axiosConfig'

function NotificationsList() {

  const [notifications, setNotifications] = useState([{}])
  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

  useEffect(() => {
    // GET NOTIFICATIONS
    const res = async () => {
      const result = await axiosConfig.get("/comment/unreadcomments",
        {
          headers: {
            "Authorization": access_token
          }
        })
      const data = result.data
      console.log("El data a secas", data)
      setNotifications(notifications => [...notifications, data])
      console.log("NOTIFICATIONS", notifications)
    };
    res()
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div>
        {/* {notifications.map(item => (
          <NotificationCard id={item} />
        ))} */}
        HOLA
      </div>
    </React.Fragment >
  )
}

export default NotificationsList