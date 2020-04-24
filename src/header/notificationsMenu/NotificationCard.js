import React, { useState, useEffect } from "react"
import { Card, Row, Col, Avatar, Badge } from 'antd'
import "./notifications.css"
import moment from 'moment'
import axiosConfig from '../../api/axiosConfig'
import { Link } from 'react-router-dom'

function NotificationCard({ item }) {

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

  const [panel, setPanel] = useState({})

  //GET ESPECIFIC SOLAR PANEL
  useEffect(() => {
    function getSpecificSolarPanel(id) {
      axiosConfig
        .get('/solarPanel/' + id,
          {
            headers: {
              "Authorization": access_token
            }
          })
        .then(response => {
          const data = response.data
          setPanel({ ...data });
          localStorage.setItem('myPanel', JSON.stringify(data))
        })
    }
    getSpecificSolarPanel(item.solarPanelId)
  }, [])

  return (
    <React.Fragment>
      <Card>
        <Row>
          <Col span={4} xs={4} sm={4} md={4} lg={4} xl={4}>
            <div id="notification-icon">
              <Link to={
                {
                  pathname: "/feed-panel-sider",
                  myPanel: { panel }
                }
              }>
                <Badge count={1}>
                  <Avatar shape="circle" icon="message" />
                </Badge>
              </Link>
            </div>
          </Col>
          <Col span={20} xs={20} sm={20} md={20} lg={20} xl={20}>
            <h1 id="notification-type">CHAT</h1>
            <p id="notification-content">{item.text}</p>
            <h4 id="notification-time">{moment(item.creationDate).format('DD/MM/YYYY')} {moment(item.creationDate).format('HH:mm')}</h4>
          </Col>
        </Row>
      </Card>
    </React.Fragment >
  )
}

export default NotificationCard