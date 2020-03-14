import React from 'react'
import recLogo from '../../assets/rect-logo.png'
import mobileLogo from '../../assets/greco-logo-mobile.png'
import { Button, Row, Col, Divider } from 'antd'
import { Link } from 'react-router-dom'
// import { injectIntl } from 'react-intl'
import './welcome.css'

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    console.log('this props', this.props)
    return (
      <Row id="row-page-cotainer">

        <Col span={12} id="col-welcome-container" xs={24} sm={24} md={24} lg={12} xl={12}>
          <Col span={24} id="welcome-logo-mobile" xs={24} sm={24} md={24} lg={0} xl={0}>
            <img src={mobileLogo} id="welcome-logo-mobile-image" alt="mobile-logo" />
          </Col>

          <div id="inside-welcome-container" >
            <h1 id="welcome-title-text" >
              WELCOME TO <br />
              THE GRECO PROJECT
          </h1>
            <p id="welcome-normal-text" >Fostering a Next Generation of <span id="welcome-normal-text-bold">European Photovoltaic Society</span> through Open Science.</p>
            <h6 id="welcome-text-mini">Do you want to <a id="link" href="https://www.greco-project.eu/">know more?</a></h6>
            <Divider id="large-divider" />
            <div id="welcome-button-container">
              <Button id="button-welcome-left"><Link to="/public-mapping">PUBLIC ACCESS </Link></Button>
              <Button id="button-welcome-right"><Link to="/login">LOG IN</Link></Button>
            </div>
            <h6 id="welcome-text-mini">Don't you have an account? <Link id="link" from="/welcome" to="/register">Sign up</Link></h6>
            <Divider id="footer-divider" />
            <h5 id="welcome-text-footer">Coordinated by the Solar Energy Institute of the Polytechnic University of Madrid.</h5>
          </div>
        </Col>
        <Col span={12} id="col-background" xs={0} sm={0} md={0} lg={12} xl={12}>
          <div id="col-background-logo">
            <img src={recLogo} width="96%" height="100%" alt="background-logo" />
          </div>
        </Col>
      </Row >
    )
  }
}

export default Welcome;