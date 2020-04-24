import React from "react"
import { Row, Col, Card, Collapse, Icon, Button, Divider } from 'antd'
import "./about.css"
import { Link } from "react-router-dom";
import PublicMapping from '../../pages/mapping/PublicMapping'

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class About extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Row>
          <Col xs={0} sm={0} md={24} lg={24} xl={24} >
            <PublicMapping />
          </Col>
        </Row>
        <Row>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <Card id="about-container">
              <Link to="/public-mapping-sider">
                <Button id="menu-close-button-about">
                  <Icon type="close" id="icon-x" />
                </Button>
              </Link>
              <h1 id="edit-details-tittle" >About</h1>
              <Divider />
              <div id="collapse-div">
                <Collapse defaultActiveKey={['About']} onChange={callback}>
                  <Panel header="About" key="About">
                    <p id="about-text">
                      Generation Solar, our pioneering Citizen Science app is the brainchild of the research and innovation project ‘GRECO’.
                      It is a unique blend of input from scientific research, IT-support, creative devotion and citizens like you and me.
                      It was launched in mid-March 2020 and acts as a database for photovoltaic (PV) installations.
                  </p>
                    <br />
                    <p id="about-text">
                      This database is very important from many perspectives: it allows exchange of information between PV installation owners,
                      it increases awareness on the impact that energy production has on the environment and it feeds data into scientific
                      models for energy efficiency.
                  </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more?
                      </h4>
                      <ul>
                        <li>
                          <a id="link" href="https://via.hypothes.is/https://www.greco-project.eu/wp-content/uploads/2020/04/PressRelease-EN.pdf" target="_blank">Generation solar press release</a>
                        </li>
                        <li>
                          <a id="link" href="https://www.ramschdesign.de/wp-content/uploads/2020/04/GRECO-Doing-science-differently.pdf" target="_blank">Check this interview to one of GRECO’s scientists.</a>
                        </li>
                      </ul>
                    </p>
                  </Panel>
                </Collapse>

                <Collapse onChange={callback}>
                  <Panel header="What is citizen science?" key="What is citizen science?">
                    <p id="about-text">
                      Citizen science is a participatory process in which citizens gets actively involved in some parts of research and innovation
                      process: decision-making, design, data collection, analysis... In Generation Solar, you can participate providing detailed
                      information of photovoltaic installations worldwide. Some scientists will use this information to model the energy grid
                      and make predictions.
                  </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more about citizen science?
                      </h4>
                      <ul>
                        <li>
                          <a id="link" href="https://www.youtube.com/watch?v=SZwJzB-yMrU" target="_blank">Check this SciShow video.</a>
                        </li>
                      </ul>
                    </p>

                  </Panel>
                </Collapse>

                <Collapse onChange={callback}>
                  <Panel header="Why is solar energy important?" key="Why is solar energy important?">
                    <p id="about-text">
                      According to the International Renewable Energy Agency, to achieve the climate goals
                      requires significant acceleration across a range of sectors and technologies.
                      By 2050 solar PV energy would be the second-largest source of electricity, just behind wind power.
                      This will lead the way for the transformation of the global electricity sector.
                  </p>
                    <br />
                    <p id="about-text">
                      Such transformation is only possible by significantly scaling up solar PV capacity in the next decades.
                      In fact, it requires increasing PV capacity by almost six fold over the next 10 years!
                  </p>
                    <br />
                    <p id="about-text">
                      The increase in solar energy production will signify a reduction in carbon dioxide emissions
                      of around 5 gigatonnes (lots of CO₂!) in 2050. This represents 21% of the total potential
                      for emission mitigation in the energy sector.
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

                  </Panel>
                </Collapse>

                <Collapse onChange={callback}>
                  <Panel header="The project GRECO" key="The project GRECO" >
                    <p id="about-text">
                      GRECO is a multinational research project funded by the European Commission that runs from 2018 to 2021.
                      Its main goal is putting Open Science and other Responsible Research and Innovation approaches into
                      action in a real project in the solar (photovoltaic) energy sector.
                  </p>
                    <br />
                    <p id="about-text">
                      Among others, GRECO sets out a framework where citizens can actively participate in the process of research,
                      development and innovation both in the design of new PV solutions, in the provision of data and in the
                      construction of a knowledge and awareness community.
                  </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more?
                    </h4>
                      Check GRECO´s website and the interview to our coordinators:
                    <ul>
                        <li>
                          <a id="link" href="https://www.greco-project.eu/the-project/" target="_blank">The project</a>
                        </li>
                        <li>
                          <a id="link" href="https://www.youtube.com/watch?v=7edNtE0c8yo" target="_blank">Coordinator interview</a>
                        </li>
                      </ul>
                    </p>

                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        Wanna know more about the future of solar PV?
                    </h4>
                      <ul>
                        <li>
                          <a id="link" href="https://www.irena.org/-/media/Files/IRENA/Agency/Publication/2019/Nov/IRENA_Future_of_Solar_PV_2019.pdf" target="_blank">
                            IRENA.Future of Solar PV 2019.pdf</a>
                        </li>
                      </ul>
                    </p>
                    <p id="about-text">
                      And remember: “Photovoltaics is the only democratic energy in the market”
                  </p>
                    <br />
                    <p id="about-text">
                      Ana Belén Cristóbal (GRECO project coordinator)
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