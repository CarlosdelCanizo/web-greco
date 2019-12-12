import React, { useContext } from 'react';
// import Context from '../utils/context';

const Profile = () => {

  // const context = useContext(Context)

  const RenderProfile = (props) => {
  
    return(
      <div>
        <h1>{props.profile.profile.userName}</h1>
        <br />
        {/* <img src={props.profile.profile.picture} alt="" /> */}
        <br />
        <h4> {props.profile.profile.email}</h4>
        <br />
        {/* <h5> {props.profile.profile.name} </h5> */}
        <br />
      </div>
     )
   }


    return(
      <div>
        {/* <RenderProfile profile={context.userProfile} /> */}
      </div>
  )}



export default (Profile);