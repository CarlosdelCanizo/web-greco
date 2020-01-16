import React, { useState, useContext, useEffect } from 'react'
import { Row, Col } from 'antd';
import './MyInstallations.css';
import Header from '../../components/header/Header'
import PanelList from './PanelList';
import ButtonAdd from './ButtonAdd'

// import PanelContext from '../../context/Context'
import UserContext from '../../utils/Auth'
import axios from 'axios'

import Auth from '../../utils/Auth'

function MyInstallations() {

  const user = useContext(UserContext)
  const { email } = UserContext;

  console.log("email hardcode", email)
  console.log("Auth", Auth)
  console.log("puto userContext", email)

  //GET MY SOLAR PANELS
  // const [myPanels, setMyPanels] = useState([]);
  // var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       'http://10.0.10.195:8088/solarPanel?q=registrationSolarPanel.owner.email::' + email,
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": access_token
  //         }
  //       }
  //     );
  //     setMyPanels(result.data.content);
  //   };
  //   fetchData();
  // }, []);

  // var panelsFromServer = myPanels.content
  // console.log("MyPanels", myPanels)

  return (
    <React.Fragment>
      <Header />

      <div id="background-installations">
        <Row>
          <Col span={24} xs={24} sm={24} md={5} lg={6} xl={6}>
            <ButtonAdd />
          </Col>
          <Col span={24} xs={24} sm={24} md={19} lg={18} xl={18}>
            {/* {myPanels.map(panel => (
              <PanelList key={panel.id} panel={panel} />
            ))} */}
            <PanelList />
          </Col>
        </Row>
      </div>
    </React.Fragment >
  );
}

export default MyInstallations