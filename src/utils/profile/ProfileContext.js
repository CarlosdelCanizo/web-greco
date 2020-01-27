import React, { createContext, useState, useEffect } from "react";
import axiosConfig from '../../api/axiosConfig'

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {

  const userProfile = {
    username: "",
    email: "",
    isPreviouslyLogged: false,
    isLoggedin: false
  }

  const [userInfo, setUserInfo] = useState({ userProfile });
  const [isLoggedin, setLoggedIn] = useState(false)

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  useEffect(() => {
    if (access_token) {
      axiosConfig.get("http://10.0.10.195:8088/users/getMyUserInfo",
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": access_token
          }
        })
        .then(result => {
          setUserInfo(result.data)
          setLoggedIn(true)
          console.log("HABEMUS TOKEN !!!!", userInfo)
        });
    }
    else {
      // setLoggedIn(false)
      console.log("TIO DIU QUE NO TE EL TOKEN!!!")
    }
  }, []);

  const username = userInfo.username
  const email = userInfo.email
  const isPreviouslyLogged = userInfo.isPreviouslyLogged

  return (
    <ProfileContext.Provider
      value={{
        username,
        email,
        isLoggedin,
        isPreviouslyLogged
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider 