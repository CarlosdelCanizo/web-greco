import React from 'react'
import recLogo from '../../assets/generation-solar-logo.svg'
import mobileLogo from '../../assets/generation-solar-logo.svg'
import ueFlag from '../../assets/flag-ue.png'
import { Button, Row, Col, Divider, Collapse } from 'antd'
import { Link } from 'react-router-dom'
// import { injectIntl } from 'react-intl'
import './welcome.css'


class Welcome extends React.Component {
  constructor(props) {
    super(props);

    var access_token = "";
    access_token = localStorage.getItem("access_token")
    if (access_token === null) {
      localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
      localStorage.setItem("actualPage", "/")
    }
    if (access_token !== null && props.location.pathname !== "/") {
      var lastpage = localStorage.getItem("lastPage")
      props.history.push(lastpage)
    }

  }

  render() {
    console.log('this props', this.props)
    return (
      <Row id="row-page-cotainer">

        <Col span={12} id="col-background" xs={0} sm={0} md={0} lg={12} xl={12}>
          <div id="background-logo">
            <img src={recLogo} width="96%" height="100%" alt="background-logo" />
          </div >
          <div id="welcome-paragraph">
            <p id="welcome-first"><span id="welcome-white-text-bold"></span>The first platform to create a unique solar energy community and promote data exchange between photovoltaic installation owners and scientists.</p>
            <p id="welcome-second">Sign up or log in to share as many photovoltaic installations as you can and...</p>
          </div>
          <div id="welcome-third">
            <p>• Take part in an environmentally committed international community</p>
            <p>• Provide valuable open data for research and management</p>
            <p>• Face new individual and community challenges</p>
            <p>• Chat with other European citizens to share interests</p>
            <p>• Invite friends to join the network</p>
            <p>• Help put the community squarely on the map</p>
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
            <h6 id="welcome-text-mini">Do you want to <a id="link" href="https://www.greco-project.eu/citizen-science-app/" target="_blank">know more?</a></h6>
            <Divider id="footer-divider" />
            <div id="welcome-button-container">
              <Button id="button-welcome-left"><Link to="/public-mapping-sider">PUBLIC ACCESS </Link></Button>
              <Button id="button-welcome-right"><Link to="/login">LOG IN</Link></Button>
            </div>
            <h6 id="welcome-text-mini">Don't you have an account? <Link id="link" from="/welcome" to="/register">Sign up</Link></h6>
            <Divider id="footer-divider" />
            <div id="welcome-text-footer">
              <p><b>Version 1.0</b> - This first version of Generation Solar is still in the improvement phase.</p>
              <p>This initiative is part of the project <a id="link" href="https://www.greco-project.eu/" target="_blank">GRECO</a> and has been coordinated by the Studies Centre on Science, Communication and Society of the University Pompeu Fabra.</p>

              <p><img src={ueFlag} width="25px" height="17px" alt="ue-flag" /> This initiative has been funded by the European Commission under the project 787280.</p>
            </div>
          </div>

        </Col>
      </Row >
    )
  }
}

export default Welcome;