// import React, { useEffect, useContext } from 'react';

// import axios from "axios";
// import { Context } from '../panelContext/Store'
// import Panel from '../panelContext/Panel';



// const PanelProva = () => {

//   const [state, dispatch] = useContext(Context);
//   var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

//   useEffect(() => {
//     axios.get('http://10.0.10.195:8088/solarPanel/40',
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": access_token
//         }
//       })
//       .then(response => {
//         const postsData = response.data;
//         console.log("el post data", postsData)
//         dispatch({ type: 'SET_POSTS', payload: postsData });
//       })
//       .catch(error => {
//         dispatch({ type: 'SET_ERROR', payload: error });
//       });
//   }, []);

//   let panel = <p>Loading...</p>;

//   if (state.error) {
//     panel = <p>Something went wrong: <span>{state.error}</span></p>;
//   }
//   else {
//     console.log("A VORE QUE EIX", panel)
//   }
//   console.log("A VORE QUE EIX 2", panel)
  // if (!state.error && state.panel) {

  //   return (
  //     { panel }
  //   )

  // }
  // return (
  //   { panel }
  // );
// };


// export default PanelProva;