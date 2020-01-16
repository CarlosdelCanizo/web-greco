import React, { useState } from 'react'
import recLogo from '../../assets/rect-logo.png'
import mobileLogo from '../../assets/greco-logo-mobile.png'
import spinner from "../../assets/spinner.svg";
import { Row, Col, Form, Input, Alert } from 'antd'
import { Redirect } from 'react-router-dom'
// import { injectIntl } from 'react-intl'
import './loginForm.css'
import './resetPassword.css'
import axios from 'axios'

const ResetPasswordForm = () => {

  const [data, setData] = React.useState("");

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });

    //POST EMAIL
    axios.post('http://10.0.10.195:8088/email/sendEmailToResetThePassword?email=' + data.email)
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
          console.log(error.message);
          //Unregistered user
          setData({ ...data, isSubmitting: false, errorMessage: error.response.data.debugMessage });
        }
      });
  }

  //Redirect
  const [toLocation, setLocation] = useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  const onClose = e => {
    window.close();
  };

  return (
    <Row>
      <Col span={24} id="logo-mobile" xs={24} sm={24} md={24} lg={0} xl={0}>
        <img src={mobileLogo} id="logo-mobile-image" alt="mobile-logo" />
      </Col>
      <Col span={12} id="col-welcome-container" xs={24} sm={24} md={24} lg={12} xl={12}>
        <div id="inside-welcome-container" >
          <h1 id="welcome-title-text" >
            RESET YOUR <br />
            PASSWORD
        </h1>
          <div>
            <p id="reset-password-text">Enter the email address you used to register. We will send you an email to reset your password.</p>
          </div>
          <Form onSubmit={handleFormSubmit} >
            <div id="input-login-form-fields">
              <Form.Item>
                <label id="label">Email</label>
                <Input placeholder="Email" type="email" name="email" id="email"
                  values={data.email} onChange={handleInputChange}
                  required
                />
              </Form.Item>

            </div>
            <div id="error-reset-message">
              {data.errorMessage && (<p >{data.errorMessage}</p>)}
            </div>
            <div id="succes-message">
              {toLocation ?
                <Alert
                  message="Success!"
                  description="Check your email."
                  type="success"
                  showIcon
                  closable
                  onClose={onClose}
                /> : null}
            </div>
            <div id="welcome-button-container">
              <button id="button-register" disabled={data.isSubmitting}>
                {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("RESET")}
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

export default ResetPasswordForm;