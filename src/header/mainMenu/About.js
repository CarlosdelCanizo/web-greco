import React from "react"
import { Row, Col, Card, Collapse, Divider, Icon, Button } from 'antd'
import Header from '../Header'
import "./about.css"
import { Link } from "react-router-dom";
import PrivateMapping from '../../pages/mapping/PrivateMapping'

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class About extends React.Component {

  render() {

    return (
      <React.Fragment>
        {
          (window.innerWidth < 600 && window.innerWidth < 768) ?
            <Header />
            :
            (null)
        }
        <Row>
          <Col xs={0} sm={0} md={24} lg={24} xl={24} >
            <PrivateMapping />
          </Col>
        </Row>
        <Row>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card id="about-container">
              <Link to="/private-mapping">
                <Button id="menu-close-button">
                  <Icon type="close" id="icon-x" />
                </Button>
              </Link>
              <h1 id="edit-details-tittle" >About</h1>
              <Divider />
              <div>
                <Collapse
                  onChange={callback}>
                  <Panel header="Greco" key="Greco">
                    <p id="about-text">
                      GRECO is a multinational research project funded by the European Commission that runs from 2018 until 2021.
                       Its main goal is putting Open Science and other Responsible Research and Innovation (RRI) approaches into
                        action in a real research project in the solar (photovoltaic) energy sector.
                  </p>
                    <br />
                    <p id="about-text">
                      GRECO sets out a framework where citizens can actively participate in the process of research,
                      development and innovation both in the design of new PV solutions, in the provision of data and
                       in the construction of a knowledge and awareness community.
                       This profoundly changes the scientist-citizen relationship.
                  </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more?
                    </h4>
                      Check GRECO´s website and the interview to our coordinators:
                    <ul>
                        <li>
                          <a id="link" href="https://www.greco-project.eu/the-project/">The project</a>
                        </li>
                        <li>
                          <a id="link" href="https://www.youtube.com/watch?v=7edNtE0c8yo">Coordinator interview</a>
                        </li>
                      </ul>
                    </p>
                  </Panel>
                </Collapse>
                <br />
                <Collapse onChange={callback}>
                  <Panel header="Generation Solar" key="Generation Solar">
                    <p id="about-text">
                      Generation Solar, our pioneering Citizen Science app is the brainchild of GRECO.
                       It is a unique blend of input from scientific research, IT-support,
                        creative devotion and citizens like you and me.
                        It was launched in mid-March and acts as a database for photovoltaic (PV) installations.
                  </p>
                    <br />
                    <p id="about-text">
                      This database is very important from many perspectives: it allows exchange of information
                      between PV installation owners,
                       it increases awareness on the impact that energy production has on the environment and
                       it feeds data into scientific models for energy efficiency.
                  </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more?
                    </h4>
                      Check this interview to one of GRECO’s scientists.
                    <ul>
                        <li>
                          <a id="link" href="">Scientists interview</a>
                        </li>
                      </ul>
                    </p>
                    <br />
                    <p id="about-text">
                      Generation solar is a citizen science app. This means that it is a participatory tool in
                       which citizens get actively involved in some part of research and innovation process:
                        decision-making, design, data collection or analysis.
                  </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more about citizen science?
                  </h4>
                      Check Generation Solar article and SciShow video:
                    <ul>
                        <li>
                          <a id="link" href="">Generation Solar</a>
                        </li>
                        <li>
                          <a id="link" href="https://www.youtube.com/watch?v=SZwJzB-yMrU">SciShow video</a>
                        </li>
                      </ul>
                    </p>
                  </Panel>
                </Collapse>
                <br />
                <Collapse onChange={callback}>
                  <Panel header="Why?" key="Why?">
                    <p id="about-text">
                      According to the International Renewable Energy Agency, to achieve the climate goals
                      requires significant acceleration across a range of sectors and technologies.
                      By 2050 solar PV energy would be the second-largest source of electricity, just behind wind power.
                       This will lead the way for the transformation of the global electricity sector.
                  </p>
                    <br />
                    <p id="about-text">
                      But such transformation is only possible by significantly scaling up solar PV capacity in the next decades.
                       In fact, it requires increasing PV capacity by almost six fold over the next 10 years!
                  </p>
                    <br />
                    <p id="about-text">
                      As if that's not enough, the increase in solar energy production will signify a reduction in carbon dioxide emissions
                       of around 5 gigatonnes (lots of CO₂!), representing 21% of the total emission mitigation potential in the energy sector
                        by 2050.
                  </p>
                    <br />
                    <p id="about-text">
                      Therefore, your participation is important!
                  </p>
                    <br />
                    <p id="about-text">
                      By joining and sharing Generation Solar you will:
                  </p>
                    <p id="about-text">
                      <ul>
                        <li>Create a unique solar energy community</li>
                        <li>Raise awareness of photovoltaics in society</li>
                        <li>Increase the global database of solar energy generation</li>
                        <li>Contribute to new and better scientific models of energy efficiency</li>
                        <li>Be part of a top-notch research network</li>
                      </ul>
                    </p>
                    <br />
                    <p id="about-text">
                      And remember: “Photovoltaics is the only democratic energy in the market”
                  </p>
                    <br />
                    <p id="about-text">
                      Ana Belén Cristóbal (GRECO project coordinator)
                  </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more about the future of solar PV?
                    </h4>
                      <ul>
                        <li>
                          <a id="link" href="https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2019/Nov/IRENA_Future_of_Solar_PV_2019.pdf">Future od solar PV</a>
                        </li>
                      </ul>
                    </p>
                  </Panel>
                </Collapse>
              </div>
              &nbsp;
              </Card>
          </Col>
        </Row>
      </React.Fragment >
    )
  }
}

export default About