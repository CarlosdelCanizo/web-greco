import React from "react"
import { Row, Col, Card } from 'antd'
import Header from '../Header'
import "./about.css"

class About extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Header />
        <Row>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <div id="about-panel-exterior-background">
              <Card id="about-container">
                <div>
                  ABOUT!
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default About