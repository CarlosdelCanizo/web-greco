import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Card, Button, Col, Row, Tag } from 'antd';
import './Challenges.css';
import noImage from '../../assets/no-image.svg'
import Header from '../../components/header/Header'
import axios from 'axios'
import { Link } from 'react-router-dom'

// import ChallengesContext from '../../context/ChallengesContext'

function ChallengeCard() {

  // const { deleteChallenge, challenges } = useContext(ChallengesContext)
  // const { id, name, description, image } = challenge

  const [myChallenges, setMyChallenges] = useState([])

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://10.0.10.195:8088/challenge',
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
                <Col span={5} xs={24} sm={24} md={5} lg={5} xl={5}>
                  <div id="challenge-card-image-container">
                    {/* {item.image} */}
                    <img src={noImage} alt="Image" id="challenge-card-image" />
                  </div>
                </Col>
                <Col span={19} xs={24} sm={24} md={24} lg={19} xl={19}>
                  <div id="challenge-card-text">
                    <p>From 12 November to 26 December</p>
                    <Tag color="#db4196" id="challenge-tag">NEW</Tag>
                    <h2 style={{ color: "#2a4092" }}>
                      {/* Be an influencer */}
                      {item.name}
                    </h2>
                    <p>
                      {item.description}
                      {/* Surely you know a lot of people with a photovoltaic panel in their home or workplace.
                    Invite who surrounds you to be an active part of this community and become an influencer! */}
                    </p>
                  </div>
                  <Link to="/challenge-level">
                    <Button size="large" id="challenge-card-button">
                      Accept the challenge
                  </Button>
                  </Link>
                </Col>
              </Row>
            </Card>
          ))}
        </div>
      </div>
    </React.Fragment>
  );

}

export default ChallengeCard