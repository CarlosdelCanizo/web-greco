import React, { useState, useContext, useEffect } from 'react'
import { Row, Col } from 'antd';
import './Challenges.css';
import Header from '../../components/header/Header'
import ChallengeList from './ChallengeList';
import axios from 'axios'
import ChallengeCard from './ChallengeCard';

// import Auth from '../../utils/Auth'
// import UserContext from '../../utils/Auth'


function MyChallenges() {

  // const user = useContext(UserContext)
  // const { email } = UserContext;


  // GET MY CHALLENGES
  // const [myChallenges, setMyChallenges] = useState([])

  // var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       'http://10.0.10.195:8088/challenge',
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Authorization": access_token
  //         }
  //       }
  //     );
  //     setMyChallenges(result.data);
  //   };
  //   fetchData();
  // }, []);

  // console.log("Challenge from server", myChallenges)

  // console.log("MyChallenges", myChallenges)

  return (
    <React.Fragment>
      <Header />

      <div id="background-installations">
        <Row>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            {/* {myChallenges.map(challenge => (
              <ChallengeList key={challenge.id} challenge={challenge} />
            ))} */}
            {/* <ChallengeList /> */}
            <ChallengeCard />

          </Col>
        </Row>
      </div>
    </React.Fragment >
  );
}

export default MyChallenges