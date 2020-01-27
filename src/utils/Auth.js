import React, { useState } from "react";
import axiosConfig from '../api/axiosConfig'
import qs from 'qs'

const Auth = (props) => {

  const [data, setData] = React.useState();

  const refresh_token = JSON.parse(localStorage.getItem('refresh_token'))
  const expires_in = JSON.parse(localStorage.getItem('expires_in'))

  function isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_in'))
    return new Date().getTime() < expiresAt
  }


  // POST REFRESH TOKEN
  var body = {
    grant_type: "refresh_token",
    refresh_token: refresh_token
  }
  axiosConfig.post("/oauth/token", qs.stringify(body),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      auth: {
        username: "crmClient1",
        password: "crmSuperSecret"
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
      let expiresAt = (expires_in * 1000 + new Date().getTime())
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

// function handleAuth(response) {
//   localStorage.setItem('access_token', response.data.accessToken)
//   localStorage.setItem('refresh_token', response.data.refresh)

//   let expiresAt = JSON.stringify((response.data.expiresIn * 1000 + new Date().getTime()))
//   localStorage.setItem('expiresAt', expiresAt)

//   getProfile();
//   // setTimeout(() => { history.replace('/authcheck') }, 600); 

// }

// function getAccessToken() {
//   if (localStorage.getItem('access_token')) {
//     const accessToken = localStorage.getItem('access_token')
//     return accessToken
//   } else {
//     return null
//   }
// }


// function getProfile() {
//   let accessToken = getAccessToken()
//   let profile = JSON.parse(localStorage.getItem('userInfo'))
//   if (accessToken && profile) {
//     this.userProfile = { profile }
//   }
// }

// function logout() {
//   localStorage.removeItem('access_token')
//   localStorage.removeItem('refresh_token')
//   localStorage.removeItem('expiresAt')
//   // setTimeout(() => { history.replace('/authcheck') }, 200); 
// }

// function isAuthenticated() {
//   let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
//   return new Date().getTime() < expiresAt
// }

// }

export default Auth
