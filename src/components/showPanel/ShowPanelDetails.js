import React from "react"
import { Card, Button, Row, Col, Icon, Divider } from 'antd'
import './ShowPanel.css'
import moment from 'moment'
import ImageSlider from '../imageSlider/ImageSlider'
import ShowMapping from "../ShowMapping"
import { Link } from "react-router-dom";

const ShowPanelDetails = (props) => {

  // const myPanel = props.location.myPanel
  // const myLocation = props.location.hash
  var myPanel = JSON.parse(localStorage.getItem("myPanel"))
  var myLocation = (localStorage.getItem("pathname"))
  console.log("MyPanel en ShowPanelDetails", myPanel)

  // function clearPanel() {
  //   localStorage.removeItem("myPanel")
  //   localStorage.removeItem("pathname")
  // }

  // function onClose() {
  //   if (myLocation === "private-mapping-sider") {
  //     props.history.push('/private-mapping-sider')
  // <Link from="/show-panel-details-sider" to="/private-mapping-sider" />
  // } else {
  //   props.history.push('/my-installations-sider')
  // <Link from="/show-panel-details-sider" to="/my-installations-sider" />
  // }
  // }

  return (
    <React.Fragment>
      <Row>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} >
          <ShowMapping lat={myPanel.lat} lon={myPanel.lon} />
        </Col>
      </Row>
      <Card id="show-panel-card-container">
        <Row>
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <p id="show-panel-card-tittle">{myPanel.installationName}</p>
            <Button id="show-panel-close-button">
              <Link to={myLocation} >
                <Icon type="close" />
              </Link>
            </Button>
            <div id="show-panel-card-image-container">
              <ImageSlider multimedia={myPanel.multimedia} />
            </div>
          </Col >
        </Row>
        <Row>
          {/* <div id="feed-panel-text-fields"> */}
          <Col span={8}>
            <h5 id="show-panel-data-labels-card">
              Installed capacity
                </h5>
            <h4 id="show-panel-data-fields">
              {myPanel.electrical_capacity} kW
                </h4>
          </Col>
          <Col span={8}>
            <h5 id="show-panel-data-labels-card">
              Area
                </h5>
            <h4 id="show-panel-data-fields">
              {myPanel.surface} m²
                </h4>
          </Col>
          <Col span={8}>
            <h5 id="show-panel-data-labels-card">
              Inverter capacity
                </h5>
            <h4 id="show-panel-data-fields">
              {myPanel.inverterCapacity} kW
                </h4>
          </Col>
          {/* </div> */}
          <Row >
            {/* <div id="feed-panel-user-name-container"> */}
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 id="feed-panel-user-name" >{myPanel.username}</h3>
            </Col>
            {/* </div> */}
          </Row>
        </Row>
        <Row>
          <Col span={12}>
            <h5 id="show-panel-data-labels-first">
              Property
                </h5>
            <h4 id="show-panel-data-fields-first">
              {myPanel.installationProperty}
            </h4>
          </Col>
          <Col span={12}>
            <h5 id="show-panel-data-labels-first">
              Technollogy used
                </h5>
            <h4 id="show-panel-data-fields-first">
              {myPanel.technologyUsed}
            </h4>
          </Col>
        </Row>
        <Divider id="show-panel-divider" />
        <Row>
          <Col span={12}>
            <h5 id="show-panel-data-labels-second">
              Orientation tracking
                </h5>
            <h4 id="show-panel-data-fields-second">
              {myPanel.panelTrackingOrientation ? (<p>Yes</p>) : (<p>No</p>)}
            </h4>
          </Col>
          <Col span={12}>
            <h5 id="show-panel-data-labels-second">
              Inclination tracking
                </h5>
            <h4 id="show-panel-data-fields-second">
              {myPanel.panelTrackingInclination ? (<p>Yes</p>) : (<p>No</p>)}
            </h4>
          </Col>
        </Row>
        <Divider id="show-panel-divider" />
        <Row>
          <Col span={12}>
            <h5 id="show-panel-data-labels-third">
              Orientation
                </h5>
            <h4 id="show-panel-data-fields-third">
              {myPanel.orientation}°
                </h4>
          </Col>
          <Col span={12}>
            <h5 id="show-panel-data-labels-third">
              Inclination
                </h5>
            <h4 id="show-panel-data-fields-third">
              {myPanel.inclination}°
                </h4>
          </Col>
        </Row>
        <Divider id="show-panel-divider" />
        <Row>
          <Col span={12}>
            <h5 id="show-panel-data-labels-second">
              Battery
                </h5>
            {myPanel.battery ?
              (<h4 id="show-panel-data-fields-second">
                Yes
              </h4>)
              :
              (<h4 id="show-panel-data-fields-second">
                No
              </h4>)
            }
          </Col>
          <Col span={12}>
            <h5 id="show-panel-data-labels-second">
              Installation date
                </h5>
            <h4 id="show-panel-data-fields-second">
              {moment(myPanel.commissioningDate).format('YYYY-MM-DD')}
            </h4>
          </Col>
        </Row>
        <Divider id="show-panel-divider" />
        <Row>
          <Col span={24}>
            <h5 id="show-panel-data-labels-third">
              Battery description
                </h5>
            <h4 id="show-panel-data-fields-third">
              {myPanel.batteryDescription}
            </h4>
          </Col>
        </Row>
        <Divider id="show-panel-divider" />
        <Row>
          <Col span={24}>
            <h5 id="show-panel-data-labels-third">
              Installation type
                </h5>
            <h4 id="show-panel-data-fields-third">
              {myPanel.installationType}
            </h4>
          </Col>
        </Row>
        <Divider id="show-panel-divider" />
        <Row>
          <Col span={24}>
            <h5 id="show-panel-data-labels-third">
              Observations
                </h5>
            <h4 id="show-panel-data-fields-third">
              {myPanel.observation}
            </h4>
          </Col>
        </Row>
      </Card>
    </React.Fragment >
  )
}

export default ShowPanelDetails