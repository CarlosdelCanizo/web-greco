import React from "react"
import { Row, Col, Card, Collapse, Divider, Icon, Button } from 'antd'
import "../../header/mainMenu/about.css"
import { Link } from "react-router-dom";
import PublicMapping from '../../pages/mapping/PublicMapping'
import '../../header/mainMenu/about.css'

const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

class PrivacyPolicy extends React.Component {

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
              <h1 id="edit-details-tittle" >Privacy Policy</h1>
              <Divider />
              <div>

                <Collapse onChange={callback}>
                  <Panel header="Legal notice" key="Legal notice">
                    <p id="about-text">
                      In order to protect the participant’s identity, no personal information will be shared and the data will be securely stored
                      according to data protection legislation. Only Data Controllers will be able to access detailed information and participants
                      will not be identifiable. Personal data will be collected solely to register to GenerationSolar web or app and will be
                      securely stored according to the digital security standards of the Technical University of Madrid (UPM).
                      You are at all times entitled to free information about your stored personal data, its origin and destination and the
                      purpose of data processing as well as a right to correction, blocking or deletion of this data. To this end, as well as
                      other questions relating to personal data, you can always ask the specified Data Processors.
                  </p>
                    <br />
                    <p id="about-text">
                      The data collected in GenerationSolar regarding photovoltaic installations will be freely downloadable (license
                      <a id="link" href="https://www.google.com/url?q=https://creativecommons.org/licenses/by/4.0/&sa=D&ust=1599644799766000&usg=AFQjCNEqcgYX7fgcEFOOS4YXyOo2_Bq02Q" target="_blank">
                        &nbsp;  CC BY 4.0</a>) for the research and innovation community
                      in order to favour energy simulation studies. At no moment this data will be used for other purposes.
                      Furthermore, the origin of the data will be transparently referenced and no personal information will be included.
                  </p>
                    <br />
                    <p id="about-text">
                      By proceeding with the registration, you accept you have been informed and consent to the processing of your personal data by
                      Generation Solar, a citizen science app. This processing is legitimate as it is necessary for the fulfilment of a mission
                      carried out in the public interest (Articles 6.1.e) of Regulation (EU) 2016/679), the transfer of data to third parties is not
                      planned, except for existing legal obligations. Likewise, the interested party may access, rectify and cancel the data, as well as
                      exercise other rights, in the terms indicated in the additional information provided together with this form.
                  </p>
                    <br />
                    <div>
                      <p id="about-know-more">
                        <h4 id="about-wanna">
                          DATA PROCESSORS
                      </h4>
                      According to Art. 4 Clause 7 of the EU General Data Protection Regulation:
                        <ul>
                          <br />
                          <li>
                            <h4 id="about-wanna">
                              UNIT OF DATA PROTECTION FROM THE UNIVERSIDAD POLITECNICA DE MADRID
                          </h4>
                          Avenida Ramiro de Maetzu 7
                          28040 Madrid
                          e-mail : proteccion.datos@upm.es
                          phone : 0034 910670663
                          </li>
                          <br />
                          <li>
                            <h4 id="about-wanna">
                              UNIVERSIDAD POLITECNICA DE MADRID
                          </h4>
                          Represented by Carlos del Cañizo
                          Instituto de Energía Solar,
                          Avenida Ramiro de Maetzu 7,
                          28040 Madrid, Spain.
                          e-mail: info@ies.upm.es
                        </li>
                          <br />
                          <li>
                            <h4 id="about-wanna">
                              UNIVERSIDAD POMPEU FABRA
                          </h4>
                          Represented by Gema Revuelta
                          Centro de Estudios de Ciencia, Comunicación y Sociedad
                          Campus Mar – UPF. C/ Doctor Aiguader, 88.
                          08003 Barcelona, Spain.
                          e-mail:  ccs@upf.edu
                        </li>
                        </ul>
                      </p>
                    </div>
                  </Panel>
                </Collapse>

                <Collapse onChange={callback}>
                  <Panel header="Privacy policy" key="Privacy policy">
                    <p id="about-text">
                      Generation Solar (hereinafter, “the App”, in any of the names that has had in the past or may acquire in the future) takes,
                      amongst other things, data and images shared by volunteers (or “citizen scientists”) and it makes this data available
                      to third parties and the public. In order to protect the privacy of its citizen scientists, the App aims to avoid
                      collecting information from which any individual may be personally identified. Therefore, when sending data or pictures,
                      participants are asked not to include names, addresses, passwords, or any other personal information. The App collects
                      the locations of volunteers’ registrations when they submit them, and these may be the volunteers’ actual locations
                      at the time of making the registration. However, this information is stored in a way that it has a resolution of 1.1
                      km. Therefore, it is not possible to identify precisely the location of any registration. Citizen scientists may
                      include notes and photographs in the registrations they submit, but it is their responsibility not to include in
                      these notes and photographs any information that they wish to keep private or any information that violates the
                      privacy rights of others or is inconsistent with the App terms of use.
                  </p>
                    <br />
                    <p id="about-text">
                      If in a particular case a user has sent personal data by mistake to the App, we encourage those who detect it to notify
                      the Project members so that they can remove this data from the public space, if possible. The App cannot guarantee the
                      removal of personal data that may be collected by the App despite measures of anonymization, nor can it guarantee that
                      such data is not visible to other members of the App or any of its employees or third parties with access to project data.
                  </p>
                    <br />
                    <p id="about-text">
                      It is noted that in the case of registrations (reports) shared by users in any public space, such as social networks,
                      citizen scientists would be relating their observations with their personal data (e.g. personal account on social networks),
                      voluntarily waiving their anonymity.
                  </p>
                    <br />
                    <div>
                      <p id="about-know-more">
                        <h4 id="about-wanna">
                          The full list of information collected is as follows:
                      </h4>
                        <ul>
                          <li>
                            All descriptive information from photovoltaic installations that volunteers own or find and submit.
                            This includes orientation, inclination, installed capacity, technology, location and any photographs,
                            notes or other information that the volunteer attaches to the register.
                          </li>
                          <li>
                            In order to make it impossible to determine precise location information from this data,
                            the latitudes and longitudes are rounded down to the nearest second decimal before the location is
                            transmitted from the volunteer’s device. This makes it impossible to determine where the actual location
                            was within an area of ~1.1 Km2.
                        </li>
                        </ul>
                      </p>
                    </div>
                  </Panel>
                </Collapse>

                <Collapse onChange={callback}>
                  <Panel header="User agreement" key="User agreement">
                    <p id="about-text">
                      Generation Solar (hereinafter, “the App”, in any of the names it has had in the past or may acquire in the future)
                      is a citizen science project developed as part of the project GRECO. This project is coordinated by the
                      Technical University of Madrid (UPF) and the Studies Centre on Science, Communication and Society of the
                      University Pompeu Fabra (CCS-UPF) is responsible for the citizen science task.
                  </p>
                    <br />
                    <p id="about-text">
                      The App relies on members of the public to report data on solar photovoltaic installations.
                      You may participate by, among other things, sharing data and images through the application for mobile devices or other
                      electronic devices. To do so, you must be an adult or supervised by an adult and you must agree to the App privacy policy
                      as well as the following terms:
                  </p>
                    <br />
                    <p id="about-know-more">
                      <ol>
                        <li>
                          By sharing your data and the installation data with the App, you agree on the present terms of use, agree that the data may
                          be released to the public as anonymous works without including your name or pseudonym, and grant the members of the
                          GRECO project a royalty-free, non-exclusive and sub-licensable license for the duration of the current applicable
                          copyright laws to exploit the work without restrictions and transfer it to others worldwide. In any case, these terms
                          do not imply any restriction on your use of your works, as the original author, and you may exploit your works by other
                          means in a manner consistent with the transfer granted by this document.
                        </li>
                        <li>
                          Generally, any original creation protectable by copyright will be disseminated by the App or the GRECO project with a CC-BY license,
                          indicating anonymous author and the Project name (example: Anonymous, CC-BY Generation Solar), even if the creations
                          contains the author’s name in it or in its metadata. Part of the databases or resulting tables from user contributions
                          will be disseminated, as a general rule, under a CC0 license.
                        </li>
                        <li>
                          You warrant that any data or works you share consist of information you have the right to make available to the App and that this is not
                          defamatory, and does not infringe any law. You understand that the data or works can be transferred to third parties, and that the App
                          cannot guarantee the capacity to remove any personal data you send by mistake.
                        </li>
                        <li>
                          You indemnify the individuals, institutions and the members of the App and its partners against all legal fees, damages
                          and other expenses that may be incurred by them as a result of your breach of the above warranty.
                        </li>
                      </ol>
                    </p>

                  </Panel>
                </Collapse>

                <Collapse onChange={callback}>
                  <Panel header="Cookies policy" key="Cookies policy">
                    <p id="about-text">
                      The recent regulatory modification regarding the publicity and management of the consent for the use of
                      cookies or other elements of information storage entails the obligation of the websites to adapt to the new
                      regulation on cookies of  <a id="link" href="http://noticias.juridicas.com/base_datos/Admin/l34-2002.html" target="_blank">Law 34/2002, of services of the Information society and electronic commerce</a>.
                  </p>
                    <br />
                    <p id="about-text">
                      The download of this type of elements, suppose the capacity to gather information of the activity of the user
                      and this fact has implications in relation to its privacy. Therefore, the new regulations impose the obligation
                      to obtain the informed consent of users to accept the use of cookies on websites.
                    </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        WHAT IS A COOKIE?
                      </h4>
                      <ul>
                        <li>
                          Cookies are small files that are downloaded to your computer when you browse websites. These files allow a website
                          to recognize a user’s browser and do not contain or collect information. They are used, for example, to keep an
                          authenticated user in an account (either an email account, social networks, etc.) without having to be
                          authenticated every time he accesses his account.
                        </li>
                      </ul>
                    </p>
                    <br />
                    <p id="about-know-more">
                      <h4 id="about-wanna">
                        WHAT KIND OF COOKIES WE USE?
                      </h4>
                      <p>At GenerationSolar.ies.upm.es we are concerned about user´s privacy. </p>
                      <ul>
                        <h3 id="about-wanna">
                          WE ONLY USE:
                      </h3>
                        <li>
                          <strong>First part cookies.</strong>
                          <br />
                        Cookies that are strictly necessary for the operation of the app.
                        They allow the interaction of the user with the website using all its functions.
                        </li>
                        <br />
                        <h3 id="about-wanna">
                          WE DON´T USE:
                      </h3>
                        <li>
                          <strong>Third-party persistent cookies.</strong>
                          <br />
                          We not use any cookie that send you any advertisements nor send your data to third parties for any purpose,
                           this includes the purpose of targeting advertisements.
                        </li>
                        <li>
                          <strong>Tracking cookies.</strong>
                          <br />
                          We don´t track you and we don’t use any third party cookie that can identify any information
                           about how people use our services.
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

export default PrivacyPolicy