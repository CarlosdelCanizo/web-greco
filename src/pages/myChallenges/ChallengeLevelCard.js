import React from 'react'
import { useState, useEffect } from 'react'
import { Card, Col, Row, Tag, Tooltip, Progress } from 'antd';
import './Challenges.css';
import noImage from '../../assets/no-image.svg'
import Gold from '../../assets/gold.svg'
import Silver from '../../assets/silver.svg'
import Bronze from '../../assets/bronze.svg'
import Header from '../../header/Header'
import axiosConfig from '../../api/axiosConfig'
import { Link } from 'react-router-dom'

// import ChallengesContext from '../../context/ChallengesContext'

function ChallengeLevelCard() {

  // const { deleteChallenge, challenges } = useContext(ChallengesContext)
  // const { id, name, description, image } = challenge

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
      setMyChallenges(result.data);
    };
    fetchData();
    console.log("MyChallenge from server:", myChallenges)
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div id="background-statistics">
        <div id="challenge-card-container">
          {myChallenges.map(item => (
            <Card key={item.id}>
              <Row>
                <Col xs={24} sm={5} md={5} lg={9} xl={7} xxl={4}>
                  <Tag color="#db4196" id="challenge-tagImage">{item.status}</Tag>
                  <div id="challenge-card-image-container">
                    {item.percentageCompleted === 100.0 ?
                      <img src={Gold} alt="medal" id="challenge-card-image" />
                      :
                      <img src={noImage} alt="medal" id="challenge-card-image" />
                    }

                  </div>
                </Col>
                <Col span={19} xs={24} sm={19} md={19} lg={15} xl={17} xxl={20}>
                  <Row>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>

                      <div id="challenge-card-text">
                        <p>From 12 November to 26 December</p>
                        <Tag color="#db4196" id="challenge-tagBox">{item.status}</Tag>
                        <h2 style={{ color: "#2a4092" }}>
                          {/* Be an influencer */}
                          {item.challengeName}
                        </h2>
                        <p>
                          {item.challengeDescription}
                          {/* Surely you know a lot of people with a photovoltaic panel in their home or workplace.
                    Invite who surrounds you to be an active part of this community and become an influencer! */}
                        </p>
                      </div>

                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>

                      <div id="challenge-percentage">
                        <Tooltip title="1 done / 2 in progress / 3 to do">
                          <Progress percent={item.percentageCompleted} successPercent={33} type="line" />
                        </Tooltip>
                      </div>

                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </div>
    </React.Fragment>
  );

}

export default ChallengeLevelCard