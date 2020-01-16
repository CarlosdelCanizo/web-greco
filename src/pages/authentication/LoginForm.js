import React from 'react'
import recLogo from '../../assets/rect-logo.png'
import mobileLogo from '../../assets/greco-logo-mobile.png'
import spinner from "../../assets/spinner.svg";
import { Row, Col, Divider, Form, Input } from 'antd'
import { Redirect, Link } from 'react-router-dom'
// import { injectIntl } from 'react-intl'
import './loginForm.css'
import axios from 'axios'
import qs from 'qs'
import Auth from '../../utils/Auth'
import { AuthContext } from '../../App'


const LoginForm = (props) => {

  const { state, dispatch } = React.useContext(AuthContext);

  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
    userProfile: {
      id: "",
      username: "",
      email: "",
      isPreviouslyLogged: false
    }
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
        activateRedirection()
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

  //Redirect
  const [toLocation, setLocation] = React.useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  return (
    <Row>
      <Col span={24} id="logo-mobile" xs={24} sm={24} md={24} lg={0} xl={0}>
        <img src={mobileLogo} id="logo-mobile-image" alt="mobile-logo" />
      </Col>
      <Col span={12} id="col-welcome-container" xs={24} sm={24} md={24} lg={12} xl={12}>
        <div id="inside-welcome-container" >
          <h1 id="welcome-title-text" >
            LOGIN TO YOUR <br />
            ACCOUNT
        </h1>
          <Form onSubmit={handleFormSubmit}>
            <div id="input-login-form-fields">

              <Form.Item>
                <label id="label">Email</label>
                <Input type="email" placeholder="Email" name="email" id="email"
                  values={data.email} onChange={handleInputChange}
                  required
                />
              </Form.Item>
              <Divider id="between-inputs" />
              <Form.Item>
                <label id="label">Password</label>
                <Input type="password" placeholder="Password" name="password" id="password"
                  values={data.password} onChange={handleInputChange}
                />
                <div id="error-message">
                  {(data.errorMessage) ? (<p >{data.errorMessage}</p>) : (null)}
                </div>
              </Form.Item>

            </div>
            <p id="welcome-text-mini">Forgot your <Link id="link" to="/reset-password">password</Link>?</p>
            <Divider id="large-divider" />
            <div id="welcome-button-container">
              <button id="button-login" disabled={data.isSubmitting}>
                {data.isSubmitting ? (<img src={spinner} alt="LOADING..." />) : ("LOGIN")}
                {toLocation ? <Redirect from="/login" to="/first" /> : null}
              </button>
            </div>
          </Form>
          <h6 id="welcome-text-mini">Do not you have an account yet? <Link id="link" to="/register">Sign up</Link></h6>

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