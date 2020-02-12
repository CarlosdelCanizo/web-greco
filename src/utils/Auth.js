import React, { useState, useEffect } from "react";
import axiosConfig from '../api/axiosConfig'
import qs from 'qs'

const Auth = (props) => {

  const refresh_token = JSON.parse(localStorage.getItem('refresh_token'))
  const expires_in = JSON.parse(localStorage.getItem('expires_in'))
  const execute_in = (expires_in - 10)
  console.log("expires_in y executes_in", expires_in, execute_in)

  useEffect(() => {
    const interval = setInterval(() => {
      getNewRefreshToken()
      console.log("REFRESH TOKEN!!!!")
    }, execute_in);
    return () => clearInterval(interval);
  }, []);

  // const isExpired = (exp?: number) => {
  //   if (!exp) {
  //     return false;
  //   }

  //   return Date.now() > exp;
  // };


  // POST REFRESH TOKEN
  function getNewRefreshToken() {
    var body = {
      grant_type: process.env.REACT_APP_GRANT_TYPE_B,
      refresh_token: refresh_token
    }
    axiosConfig.post("/oauth/token", qs.stringify(body),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        auth: {
          username: process.env.REACT_APP_USER_NAME,
          password: process.env.REACT_APP_PASSWORD
        }

      })
      .then(response => {
        if (response.status === 200) {
          return response
        }
        throw response
      })
      .then(response => {
        localStorage.setItem("access_token", JSON.stringify(response.access_token))
        localStorage.setItem("refresh_token", JSON.stringify(response.refresh_token))
        localStorage.setItem("expires_in", JSON.stringify(response.expires_in))
      })
      .catch(error => {
        if (error.response === undefined) {
          // NetWork Error  
          // setData({ ...data, isSubmitting: false, errorMessage: error.message });
        }
        else {
          if (error.response.status === 400) {
            // bad credentials  
            // setData({ ...data, isSubmitting: false, errorMessage: error.response.data.error_description });
          }
        }
      });

  }


}

export default Auth
