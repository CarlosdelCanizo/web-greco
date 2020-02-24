import React from 'react'
import { Row, Col } from 'antd';
import './Challenges.css';
import Header from '../../header/Header'
import ChallengeList from './ChallengeList';

function MyChallenges() {
  document.body.classList.remove('body_forms');
  return (
    <React.Fragment>
      <Header />
      <div id="background-installations">
        <Row >
          <Col id="background-row" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <ChallengeList />
          </Col>
        </Row>
      </div>
    </React.Fragment >
  );
}

export default MyChallenges