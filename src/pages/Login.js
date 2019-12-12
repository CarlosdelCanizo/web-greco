import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import axios from 'axios';
import qs from "qs";
import spinner from "../assets/spinner.svg";
import recLogo from "../assets/rect-logo.png";
import { Grid, Segment, Container, Image, Form, Divider } from 'semantic-ui-react';


const Login = (props) => {

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null
  };

  // const userInfo = {
  //   username: "",
  //   email: "",
  //   isAuthenticated: false,
  //   isPreviouslyLogged: false
  // }

  const [data, setData] = useState(initialState);
  // const [userProfile, setUserProfile] = React.useState(userInfo);

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });
    //POST LOGIN
    var body = {
      grant_type: "password",
      username: data.email,
      password: data.password,
    }
    axios.post("http://10.0.10.195:8088/oauth/token", qs.stringify(body),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        },
        auth: {
          username: "crmClient1",
          password: "crmSuperSecret"
        },
        scope: "read write trust"
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.clear();
          localStorage.setItem('access_token', response.data.access_token)
          localStorage.setItem('refresh_token', response.data.refresh_token)
          let expiresAt = (response.data.expires_in * 1000 + new Date().getTime())
          localStorage.setItem('expiresAt', expiresAt)
          // getMyUserInfo()
          activateRedirection()
        }
      })
      .catch(error => {
        if (error.response === undefined) {
          // NetWork Error  
          setData({ ...data, isSubmitting: false, errorMessage: error.message });
        }
        else {
          if (error.response.status === 400) {
            // bad credentials  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.error_description });
          }
        }
      });
  };

  //GET MY USER INFO
  // function getMyUserInfo() {
  //   var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
  //   axios.get("http://10.0.10.195:8088/users/getMyUserInfo",
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "Authorization": access_token
  //       }
  //     })
  //     .then(response => {
  //       if (response.status === 200) {
  //         return response;
  //       }
  //     })
  //     .then(response => {
  //       setUserProfile(
  //         userProfile.userId = response.data.userId,
  //         userProfile.username = response.data.username,
  //         userProfile.email = response.data.email,
  //         userProfile.isAuthenticated = true,
  //         userProfile.isPreviouslyLogged = response.data.isPreviouslyLogged
  //       )
  //       console.log(userProfile)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     });
  // }

  //Redirect
  const [toLocation, setLocation] = useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  return (

    <Segment placeholder>
      <Grid id="grid-login" stackable columns={2} align='center' >

        <Grid.Column>
          <Container id="container-login" fluid>
            <h1 id="title-login" >LOGIN TO YOUR ACCOUNT</h1>

            <Form onSubmit={handleFormSubmit}>
              <div id="input-form-fields">
                <Form.Field>
                  <label id="label">Email</label>
                  <input placeholder='Email' type="email" name="email" id="email"
                    values={data.username} onChange={handleInputChange}
                    required />
                </Form.Field>

                <Divider hidden />

                <Form.Field >
                  <label id="label">Password</label>
                  <input placeholder="Password" type="password" name="password" id="password"
                    values={data.password} onChange={handleInputChange}
                    required />
                </Form.Field>
              </div>
              <div id="error-login-message">
                {(data.errorMessage) ? (<p >{data.errorMessage}</p>) : (null)}
              </div>
              <div id="input-form-fields">
                <p id="mini-text-login">Forgot your <Link id="link" from="/login" to="/reset-password">password</Link>?</p>
                <Divider hidden />

                <div id="button-container-login">
                  <button id="button-login" disabled={data.isSubmitting}>
                    {data.isSubmitting ? (<img src={spinner} alt="LOADING..." />) : ("LOGIN")}
                    {toLocation ? <Redirect from="/login" to="/first" /> : null}
                  </button>
                </div>
                <Divider hidden />

                <p id="mini-text-login">Do not have you an account yet? <Link id="link" from="/login" to="/register">Sign up</Link></p>
                <Divider id="separator" hidden />
                <h6 id="mini-text-login">Read terms and <a id="link" href="https://www.greco-project.eu/">privacy policy</a>.</h6>
              </div>
            </Form>
          </Container>
        </Grid.Column>

        <Grid.Column id="background" only='computer'>
          <div id="logo">
            <Image id="logo" src={recLogo} />
          </div>
        </Grid.Column>

      </Grid>
    </Segment >
  )
}

export default Login;