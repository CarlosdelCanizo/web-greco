// import React, { useState, useEffect, useContext } from 'react'
// import ChallengesContext from './ChallengesContext'
// import axios from 'axios'
// import UserContext from '../utils/Auth'

// const ChallengesProvider = ({ children }) => {

//   const user = useContext(UserContext)
//   const { email } = UserContext;

//   //GET MY SOLAR PANELS
//   const [myChallenges, setMyChallenges] = useState([]);
//   var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
//   useEffect(() => {
//     axios.get("http://10.0.10.195:8088/challenge" + email,
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": access_token
//         }
//       })
//       .then(result => setMyChallenges(result.data.content));
//   }, []);

//   console.log("myPanels de panel provider", myChallenges)


//   const deleteChallenge = id => {
//     setChallenges(prevState => {
//       const challenges = prevState.challenges.filter(challenge => challenge.id !== id);
//       return { ...prevState, challenges };
//     });
//   };

//   const addChallenge = challenge => {
//     setChallenges(prevState => ({
//       ...prevState,
//       challenges: [challenge, ...prevState.challenges],
//     }));
//   }

//   // const editPanel = id => {
//   //   const panels = prevState.panels.filter(panel => panel.id !== id);
//   //   setPanels(prevState => ({
//   //     ...prevState,
//   //     panels: [panel, ...prevState.panels],
//   //   }))
//   // }

//   const challengeState = {
//     challenges: [
//       {
//         "id": 20,
//         "name": "Be an Influencer",
//         "description": "Be an Influencer",
//         "image": null
//       },
//       {
//         "id": 30,
//         "name": "Number of Solar Panels",
//         "description": "Number of Solar Panels",
//         "image": null
//       },
//       {
//         "id": 40,
//         "name": "Number of Comments",
//         "description": "Number of Comments",
//         "image": null
//       },
//       {
//         "id": 50,
//         "name": "Saved CO2",
//         "description": "Saved CO2",
//         "image": null
//       },
//     ],
//     deleteChallenge,
//     addChallenge,
//     // editPanel
//   }

//   {
//     myChallenges.map(challenge => (
//       challengeState.challenges = challenge
//     ))
//   }

//   const [challenges, setChallenges] = useState(challengeState)

//   console.log("els putos panels vinguts del server", challenges)
//   return <ChallengesContext.Provider value={challenges}>{children}</ChallengesContext.Provider>
// }

// export default ChallengesProvider