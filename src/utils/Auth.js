import React, { Component } from "react";

class Auth extends Component {
  state = {
    isLogged: false
  };
  render() {
    const access_token = JSON.parse(localStorage.getItem('access_token'))
    if (access_token) {
      this.setState({ isLogged: true })
    }

    return (
      <div>
      </div>
    );
  }
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
