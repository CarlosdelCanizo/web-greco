import React, { useState } from 'react'
import recLogo from '../../assets/rect-logo.png'
import mobileLogo from '../../assets/greco-logo-mobile.png'
import spinner from '../../assets/spinner.svg'
import { Row, Col, Divider, Form, Input } from 'antd'
import { Redirect } from 'react-router-dom'
import './loginForm.css'
import './confirmPasswordForm.css'
import axiosConfig from '../../api/axiosConfig'

const ConfirmPasswordForm = (props) => {

  function getUuidParameter() {
    var uuid = window.location.search
    var newUuid = uuid.replace('?', '')
    return newUuid
  }

  const [data, setData] = React.useState("");

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });

    //PUT CONFIRM
    var uuid = getUuidParameter();
    var body = {
      uuid: uuid,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }
    axiosConfig.put("/users/resetPassword", (body),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status === 200) {
          activateRedirection()
        }
      })
      .catch(function (error) {
        if (error.response === undefined) {
          // NetWork Error  
          setData({ ...data, isSubmitting: false, errorMessage: error.message });
        }
        else {
          if (error.response.status === 403)
            // User already exist
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          if (error.response.status === 400) {
            //password and confirm password doesn´t match
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.debugMessage });
          }
        }
      });
  }

  //Redirect
  const [toLocation, setLocation] = useState(false);
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
            CONFIRM YOUR <br />
            PASSWORD
        </h1>
          <div>
            <p id="reset-password-text">Enter your mail address and confirm your new password.</p>
          </div>
          <Form onSubmit={handleFormSubmit} className="login-form">
            <div id="input-login-form-fields">
              <Form.Item>
                <label id="label">Email</label>
                <Input placeholder="Your email" type="email" name="email" id="email"
                  values={data.email} onChange={handleInputChange}
                  required
                />
              </Form.Item>
              <Divider id="between-inputs" />
              <Form.Item>
                <label id="label">Password</label>
                <Input placeholder="Password" type="password" name="password" id="password"
                  values={data.password} onChange={handleInputChange}
                  required
                />
              </Form.Item>
              <Divider id="between-inputs" />
              <Form.Item>
                <label id="label">Confirm password</label>
                <Input placeholder="Confirm password" type="password" name="confirmPassword" id="password"
                  values={data.confirmPassword} onChange={handleInputChange}
                  required
                />
              </Form.Item>
              <div id="error-confirm-message">
                {data.errorMessage && (<p >{data.errorMessage}</p>)}
              </div>
            </div>
            <div id="welcome-button-container">
              <button id="button-register" disabled={data.isSubmitting}>
                {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("CONFIRMED")}
                {toLocation ? <Redirect from="/confirm-password" to="/login" /> : null}
              </button>
            </div>
          </Form>
        </div>
        <div id="welcome-text-footer-container">
          <h6 id="login-text-footer">&nbsp;&nbsp;</h6>
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

export default ConfirmPasswordForm;