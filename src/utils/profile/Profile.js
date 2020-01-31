import React, { useContext, useEffect } from "react";
import { Avatar } from 'antd'
import './profile.css'
import { ProfileContext } from './ProfileContext'

const Profile = () => {

  useEffect(() => {
    const profileContext = useContext(ProfileContext)
    console.log("EL CULPABLE", profileContext)
  }, []);


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
        (<h2 id="user-menu-tittle">GRECO</h2>)}
    </div>

  );

}

export default Profile