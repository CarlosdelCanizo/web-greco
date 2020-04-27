import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Col, Row, Tag, Tooltip, Progress } from 'antd';
import './Challenges.css';
import noImage from '../../assets/no-image.svg'
import Gold from '../../assets/gold.svg'
import Silver from '../../assets/silver.svg'
import Bronze from '../../assets/bronze.svg'
import axiosConfig from '../../api/axiosConfig'
import influencer from '../../assets/influencer.svg'
import superPowers from '../../assets/solar-super-powers.svg'
import moreMerrier from '../../assets/the-more-the-merrier.svg'
import bestFriends from '../../assets/solar-best-friends.svg'
import debateMaster from '../../assets/debate-master.svg'

function ChallengeLevelCard() {

  const [myChallenges, setMyChallenges] = useState([])

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosConfig(
        '/challenge/userChallenges/',
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        }
      );
      var challengesInfo = result.data
      setMyChallenges(challengesInfo);
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <div id="challenge-card-container">
        {myChallenges.map(item => (
          <Card id="individual-challenge-card" key={item.id}>
            <Row>
              <Col xs={24} sm={5} md={7} lg={9} xl={7} xxl={6}>
                <Row>
                  <Tag id="challenge-tagImage" color={item.status === "OPEN" ? ("#2a4092") : ("#db4196")} >{item.status}</Tag>
                  <div id="challenge-card-image-container">
                    {item.percentageCompleted === 100.0 ?
                      (<img src={Gold} alt="gold-medal" id="challenge-card-image" />)
                      :
                      (item.percentageCompleted <= 66.0 && item.percentageCompleted >= 33.0 ?
                        (<img src={Silver} alt="silver-medal" id="challenge-card-image" />)
                        :
                        (item.percentageCompleted <= 32.0 && item.percentageCompleted >= 1.0 ?
                          (<img src={Bronze} alt="bronze-medal" id="challenge-card-image" />)
                          :
                          (<img src={item.id === 10 ? (bestFriends) : (item.id === 20 ? (influencer)
                            : (item.id === 30 ? (moreMerrier) : (item.id === 40 ? (debateMaster)
                              : (item.id === 50 ? (superPowers) : (noImage)))))} alt="challenge-picture" id="challenge-card-image" />)))
                    }

                  </div>
                </Row>
              </Col>
              <Col xs={24} sm={19} md={17} lg={15} xl={17} xxl={18}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                    <div id="challenge-card-text">
                      <Tag id="challenge-tagBox" color={item.status === "OPEN" ? ("#2a4092") : ("#db4196")} >{item.status}</Tag>
                      <h2 style={{ color: "#2a4092" }}>
                        {item.challengeName}
                      </h2>
                      <p id="challenge-description-text">
                        {item.challengeDescription}
                      </p>
                    </div>

                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                    <div id="challenge-percentage">

                      <Progress
                        strokeColor={{
                          from: '#2a4092',
                          to: '#db4196'
                        }}
                        percent={item.percentageCompleted}
                        status="active"
                      />

                    </div>

                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        ))}
      </div>
    </React.Fragment>
  );

}

export default ChallengeLevelCard