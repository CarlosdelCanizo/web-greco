import React from "react"
import { Card, Row, Col, Divider, Avatar, Badge, Button } from 'antd'
import "./notifications.css"
import moment from 'moment'

function NotificationCard({ item }) {

  return (
    <React.Fragment>
      <Card>
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
            <p id="notification-content">{item.text}</p>
            <h4 id="notification-time">{moment(item.creationDate).format('DD/MM/YYYY')} {moment(item.creationDate).format('HH:mm')}</h4>
          </Col>
        </Row>
      </Card>
    </React.Fragment >
  )
}

export default NotificationCard