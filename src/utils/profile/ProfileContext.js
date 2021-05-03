import React, { createContext, useState, useEffect } from 'react';
import axiosConfig from '../../api/axiosConfig';
export const ProfileContext = createContext();

const ProfileProvider = ({ children, props }) => {

  const userProfile = {
    username: '',
    email: '',
    isPreviouslyLogged: false,
    isLoggedin: false
  }

  const [userInfo, setUserInfo] = useState({ ...userProfile });
  const [isLoggedin, setLoggedIn] = useState(false);

  useEffect(() => {
    let access_token = JSON.parse(localStorage.getItem('access_token'));
    if (access_token !== null) {
      access_token = 'Bearer ' + access_token;
      axiosConfig.get("/users/getMyUserInfo",
        {
          headers: {
            "Content-Type": 'application/json',
            "Authorization": access_token
          }
        })
        .then(result => {
          setUserInfo({ ...result.data })
          setLoggedIn(true)
        });
    }
  }, []);

  const username = userInfo.username;
  const email = userInfo.email;
  const isPreviouslyLogged = userInfo.isPreviouslyLogged;

  return (
    <ProfileContext.Provider
      value={{
        username,
        email,
        isLoggedin,
        isPreviouslyLogged,
        setUserInfo,
        setLoggedIn
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileProvider;