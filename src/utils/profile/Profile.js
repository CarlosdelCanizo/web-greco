import React, { useContext, useEffect, Fragment } from "react";
import { Avatar } from 'antd'
import './profile.css'
import { ProfileContext } from './ProfileContext'

//var access_token

const Profile = () => {

  const profileContext = useContext(ProfileContext)

  function getName() {
    let name = profileContext.username;
    return name
      .slice(0, 2)
  }

  // useEffect(() => {
  //   access_token = JSON.parse(localStorage.getItem('access_token'))
  //   if (access_token === null || access_token === undefined) {
  //     profileContext.isLoggedin = false
  //     console.log("You are not logged")
  //   } else {
  //     profileContext.isLoggedin = true
  //     console.log("You´re logged")
  //   }
  // }, [access_token]);

  return (

    <div>
      {profileContext.isLoggedin ?
        (
          <div id="user-info">
            <Avatar id="user-menu-avatar">{getName()}</Avatar>
            <p id="user-menu-name">{profileContext.username}</p>
            <h4 id="user-menu-email" >{profileContext.email}</h4>
          </div>
        )
        :
        (<Fragment><h1 id="user-menu-title-not-logged-in">Generation Solar</h1><p id="user-not-logged-in">You´re not logged in</p></Fragment>)}
    </div>

  );

}

export default Profile