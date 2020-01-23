import React, { useState, useEffect } from "react"
import { Card, Row, Col, Divider, Avatar, Badge, Button } from 'antd'
import Header from '../Header'
import NotificationCard from './NotificationCard'
import "./notifications.css"
import axios from 'axios'

function NotificationsList() {

  const [notifications, setNotifications] = useState([])

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://10.0.10.195:8088/comments/unreadcomments',
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        }
      );
      setNotifications(result.data);
    };
    fetchData();
    console.log("Notificaions from server:", notifications)
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div>

        <NotificationCard />

      </div>
    </React.Fragment >
  )
}

export default NotificationsList