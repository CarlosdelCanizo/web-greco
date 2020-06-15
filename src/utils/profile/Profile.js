import React, { useContext, useEffect } from "react";
import { Avatar } from 'antd'
import './profile.css'
import { ProfileContext } from './ProfileContext'

const Profile = () => {

  const profileContext = useContext(ProfileContext)

  function getName() {
    let name = profileContext.username;
    return name
      .slice(0, 2)
  }

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