import React from 'react'
import recLogo from '../../assets/rect-logo.png'
import mobileLogo from '../../assets/greco-logo-mobile.png'
import ueFlag from '../../assets/flag-ue.png'
import { Button, Row, Col, Divider, Collapse } from 'antd'
import { Link } from 'react-router-dom'
// import { injectIntl } from 'react-intl'
import './welcome.css'

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}


class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  render() {
    console.log('this props', this.props)
    return (
      <Row id="row-page-cotainer">

        <Col span={12} id="col-background" xs={0} sm={0} md={0} lg={12} xl={12}>
          <div id="background-logo">
            <img src={recLogo} width="96%" height="100%" alt="background-logo" />
          </div >
          <div id="welcome-first">
            <p>Generation Solar is the first platform that creates a unique solar energy community and promotes data exchange between photovoltaic installation owners and scientists.</p>
            <p id="welcome-second">Sign up or log in to share as many photovoltaic installations as you can and...</p>
          </div>
          <div id="welcome-third">
            <p>• Take part of an environmentally committed international community</p>
            <p>• Provide valuable open data for research and management</p>
            <p>• Face new individual and community challenges</p>
            <p>• Chat with other European citizens to share interestsy</p>
            <p>• Invite friends to join the network</p>
            <p>• Make the map and the community grow</p>
            <p>• Get public data to analyse the behaviour of decentralized energy systems</p>
          </div>
        </Col>

        <Col span={12} id="col-welcome-container" xs={24} sm={24} md={24} lg={12} xl={12}>
          <Col span={24} id="welcome-logo-mobile" xs={24} sm={24} md={24} lg={0} xl={0}>
            <img src={mobileLogo} id="welcome-logo-mobile-image" alt="mobile-logo" />
          </Col>
          <div id="inside-welcome-container" >
            <h1 id="welcome-title-text" >
              WELCOME TO <br />
              GENERATION SOLAR
            </h1>
            <p id="welcome-normal-text" >A <span id="welcome-normal-text-bold">new generation</span> that supports clean and renewable energies.</p>
            <Divider id="large-divider" />
            <p id="welcome-normal-text" >Join the community!</p>
            <h6 id="welcome-text-mini">Do you want to <a id="link" href="https://www.greco-project.eu/citizen-science-app/">know more?</a></h6>
            <Divider id="footer-divider" />
            <div id="welcome-button-container">
              <Button id="button-welcome-left"><Link to="/public-mapping">PUBLIC ACCESS </Link></Button>
              <Button id="button-welcome-right"><Link to="/login">LOG IN</Link></Button>
            </div>
            <h6 id="welcome-text-mini">Don't you have an account? <Link id="link" from="/welcome" to="/register">Sign up</Link></h6>
            <Divider id="footer-divider" />
            <div id="welcome-text-footer">
              <p>This initiative is part of the project <a id="link" href="https://www.greco-project.eu/">GRECO</a> and has been coordinated by the Studies Centre on Science, Communication and Society of the University Pompeu Fabra.</p>

              <p><img src={ueFlag} width="25px" height="17px" alt="ue-flag" /> This initiative has been funded by the European Commission under the project 787280.</p>
            </div>
          </div>

        </Col>
      </Row >
    )
  }
}

export default Welcome;