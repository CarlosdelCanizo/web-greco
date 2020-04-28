import React, { useState } from 'react'
import recLogo from '../../assets/generation-solar-logo.svg'
import mobileLogo from '../../assets/generation-solar-logo.svg'
import spinner from '../../assets/spinner.svg'
import { Row, Col, Form, Input, Button } from 'antd'
import { Redirect } from 'react-router-dom'
import './loginForm.css'
import './confirmPasswordForm.css'
import axiosConfig from '../../api/axiosConfig'

const ConfirmPasswordForm = (props) => {

  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/confirm")

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
      <Col span={12} id="col-welcome-container" xs={24} sm={24} md={24} lg={12} xl={12}>
        <Col span={24} id="confirm-logo-mobile" xs={24} sm={24} md={24} lg={0} xl={0}>
          <img src={mobileLogo} id="confirm-logo-mobile-image" alt="mobile-logo" />
        </Col>
        <div id="inside-confirm-container" >
          <h1 id="login-title-text" >
            CONFIRM YOUR <br />
            PASSWORD
        </h1>
          <div>
            <p id="reset-password-text">Enter your mail address and confirm your new password.</p>
          </div>
          <Form onSubmit={handleFormSubmit}>
            <div id="input-login-form-fields">
              <Form.Item>
                <div id="div-confirm-background">
                  <label id="label-confirm">Email</label>
                  <Input
                    placeholder="Your email"
                    type="email"
                    name="email"
                    id="confirm-email"
                    values={data.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div id="div-confirm-background">
                  <label id="label-confirm">Password</label>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    id="confirm-password"
                    values={data.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Form.Item>
              <Form.Item>
                <div id="div-confirm-background">
                  <label id="label-confirm">Confirm password</label>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    name="confirmPassword"
                    id="confirm-confirm"
                    values={data.confirmPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </Form.Item>
              <div id="error-confirm-message">
                {data.errorMessage && (<p >{data.errorMessage}</p>)}
              </div>
            </div>
            <div id="welcome-button-container">
              <Button id="button-confirm"
                disabled={data.isSubmitting}
                onClick={handleFormSubmit}>
                {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("CONFIRM")}
                {toLocation ? (props.history.push("/login")) : (null)}
              </Button>
            </div>
          </Form>
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