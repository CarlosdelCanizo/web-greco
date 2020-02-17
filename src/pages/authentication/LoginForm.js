import React, { useContext, useState } from 'react'
import recLogo from '../../assets/rect-logo.png'
import mobileLogo from '../../assets/greco-logo-mobile.png'
import spinner from "../../assets/spinner.svg";
import { Row, Col, Divider, Form, Input } from 'antd'
import { Link } from 'react-router-dom'
// import { injectIntl } from 'react-intl'
import './loginForm.css'
import qs from 'qs'
import { AuthContext } from '../../App'
import { ProfileContext } from '../../utils/profile/ProfileContext'
import axiosConfig from '../../api/axiosConfig'

const LoginForm = (props) => {

  const { dispatch } = React.useContext(AuthContext)
  const { setUserInfo, setLoggedIn } = useContext(ProfileContext)

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  };

  const [data, setData] = React.useState(initialState);

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });

    // POST LOGIN
    var body = {
      grant_type: process.env.REACT_APP_GRANT_TYPE_A,
      username: data.email,
      password: data.password,
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
        },
        scope: process.env.REACT_APP_SCOPE
      })
      .then(response => {
        if (response.status === 200) {
          return response
        }
        throw response
      })
      .then(response => {
        const res = response.data
        dispatch({
          type: "LOGIN",
          payload: res
        })
        getMyUserInfo()
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

  function getMyUserInfo() {
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

    axiosConfig.get("/users/getMyUserInfo",
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(result => {
        var data = result.data
        setUserInfo(result.data)
        setLoggedIn(true)
        if (data.isPreviouslyLogged === true) {

          props.history.push('/private-mapping')
        }
        else {
          props.history.push('/first')
        }
      })
  }

  return (
    <Row>
      <Col span={12} id="col-welcome-container" xs={24} sm={24} md={24} lg={12} xl={12}>
        <Col span={24} id="logo-mobile" xs={24} sm={24} md={24} lg={0} xl={0}>
          <img src={mobileLogo} id="logo-mobile-image" alt="mobile-logo" />
        </Col>
        <div id="inside-welcome-container" >
          <h1 id="welcome-title-text" >
            LOGIN TO YOUR <br />
            ACCOUNT
        </h1>
          <Form onSubmit={handleFormSubmit}>
            <div id="input-login-form-fields">

              <Form.Item>
                <div id="div-login-email-background">
                  <label id="login-label">Email</label>
                  <Input type="email"
                    placeholder="Email"
                    name="email"
                    id="email"
                    values={data.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Form.Item>
              <Divider id="between-inputs" />
              <Form.Item>
                <div id="div-login-email-background">
                  <label id="login-label">Password</label>
                  <Input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    values={data.password}
                    onChange={handleInputChange}
                  />
                </div>
              </Form.Item>
              <div id="login-error-message">
                {(data.errorMessage) ? (<p>{data.errorMessage}</p>) : (null)}
              </div>
            </div>
            <div>
              <p id="welcome-text-mini-forget">Forgot your <Link id="link" to="/reset-password">password</Link>?</p>
              <Divider id="large-divider" />
            </div>
            <div id="welcome-button-container">
              <button id="button-login" disabled={data.isSubmitting}>
                {data.isSubmitting ? (<img src={spinner} alt="LOADING..." />) : ("LOGIN")}
              </button>
            </div>
          </Form>
          <h6 id="welcome-text-mini-account">Do not you have an account yet? <Link id="link" to="/register">Sign up</Link></h6>

          <div id="welcome-text-footer-container">
            <h6 id="login-text-footer">Read terms and <a id="link" href="https://www.greco-project.eu/">privacy policy</a>.</h6>
          </div>
        </div>
      </Col>
      <Col span={12} id="col-background" xs={0} sm={0} md={0} lg={12} xl={12}>
        <div id="col-background-logo">
          <img src={recLogo} width="96%" height="100%" alt="background-logo" />
        </div>
      </Col>
    </Row>
  )
}

export default LoginForm;