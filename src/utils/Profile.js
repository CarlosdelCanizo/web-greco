import React, { useEffect, useState } from "react";
import { Avatar } from 'antd'
import axios from 'axios'
import './profile.css'

const Profile = (props) => {

  const userProfile = {
    username: "",
    email: "",
    isPreviouslyLogged: false
  }

  const [userInfo, setUserInfo] = useState(userProfile);
  const [isLoggedin, setLoggedIn] = useState(false)

  function getName() {
    let name = userInfo.username;
    return name
      .slice(0, 2)
  }

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    if (access_token)
      axios.get("http://10.0.10.195:8088/users/getMyUserInfo",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        })
        .then(result => {
          setUserInfo(result.data)
          setLoggedIn(true)
        });
    else
      setLoggedIn(false)
  }, []);

  return (

    <div>
      {isLoggedin ?
        (
          <div id="user-info">
            <Avatar id="user-menu-avatar">{getName()}</Avatar>
            <p id="user-menu-name">{userInfo.username}</p>
            <h4 id="user-menu-email" >{userInfo.email}</h4>
          </div>
        )
        :
        (<h2 id="user-menu-tittle">GRECO</h2>)}
    </div>

  );

}

export default Profile