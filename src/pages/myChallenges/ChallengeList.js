import React from 'react'
import { useState, useEffect, useContext } from 'react'
import './Challenges.css';
import axios from 'axios'
// import ChallengesContext from '../../context/ChallengesContext'
import ChallengeCard from './ChallengeCard'

function ChallengeList() {

  // const { challenges } = useContext(ChallengesContext)

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
  }, []);

  // console.log("Challenge from server", myChallenges)

  return (
    <div>
      {myChallenges.map(challenge => (
        <ChallengeCard key={challenge.id} challenge={challenge} />
      ))}
      {/* {myChallenges.map(challenge => (
        <ChallengeCard key={challenge.id}>
          {challenge}
        </ChallengeCard>))} */}
      {/* <ChallengeList /> */}
    </div>
  )
}
export default ChallengeList