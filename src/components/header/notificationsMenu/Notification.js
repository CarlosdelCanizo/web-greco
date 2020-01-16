import React from "react"
import { Card, Row, Col, Divider } from 'antd'
import Header from '../Header'
import noImage from '../../../assets/no-image.svg'
import "./notifications.css"

class Notification extends React.Component {

  render() {
    console.log('this props', this.props)
    return (
      <React.Fragment>
        <Header />
        <Row>
          <Card id="notification-detail">
            <Col span={4} xs={4} sm={4} md={4} lg={4} xl={4}>
              <img src={noImage} id="notification-icon" />
            </Col>
            <Col span={20} xs={20} sm={20} md={20} lg={20} xl={20}>
              <h1 id="notification-type">CHAT</h1>
              <p id="notification-content">Buenas, que modelo de placa tienes?</p>
              <h4 id="notification-time">Hace 20m</h4>
            </Col>
            <Divider />
          </Card>
        </Row>
      </React.Fragment >
    )
  }
}

export default Notification