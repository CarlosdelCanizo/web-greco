import React from 'react'
import { useState, useEffect } from 'react'
import './Challenges.css';
import axiosConfig from '../../api/axiosConfig'
import ChallengeLevelCard from './ChallengeLevelCard'

function ChallengeList() {

  const [myChallenges, setMyChallenges] = useState([])

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    const fetchData = async () => {
      const result = await axiosConfig(
        '/challenge',
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

  return (
    <div>
      {myChallenges.map(challenge => (
        <ChallengeLevelCard key={challenge.id} challenge={challenge} />
      ))}
    </div>
  )
}
export default ChallengeList