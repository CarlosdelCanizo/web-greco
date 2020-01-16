import React, { useState } from "react"
import { Card, Button, Col, Row, Tag, Input, Form, Alert } from 'antd';
import Header from '../Header'
import "../Header.css"
import recLogo from '../../../assets/rect-logo.png'
import mobileLogo from '../../../assets/greco-logo-mobile.png'
import spinner from "../../../assets/spinner.svg";
import axios from 'axios'
import qs from 'qs'

const InviteFriends = () => {

  const [data, setData] = React.useState("");

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });

    //POST EMAIL
    var body = {
    }
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
    axios.post('http://10.0.10.195:8088/referedUser?email=' + data.email, body,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
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

  return (
    <React.Fragment>
      <Header />

      <div id="edit-details-outside">
        <Card id="edit-details-menu-inside">
          <Row>
            <Col span={24} id="logo-mobile" xs={24} sm={24} md={24} lg={0} xl={0}>
              <img src={mobileLogo} id="logo-mobile-image" alt="mobile-logo" />
            </Col>
            <Col span={24} id="col-welcome-container" xs={24} sm={24} md={24} lg={24} xl={24}>
              {/* <div id="inside-welcome-container" > */}
              <h1 id="welcome-title-text" >
                INVITE A FRIEND
                  </h1>
              <div>
                <p id="reset-password-text">Enter the email address of your friend!</p>
              </div>
              <Form onSubmit={handleFormSubmit} >
                <div id="input-login-form-fields">
                  <Form.Item>
                    <label id="label">Friend´s Email</label>
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
                      description="Invitation sent"
                      type="success"
                      showIcon
                      closable
                    /> : null}
                </div>
                <div id="welcome-button-container">
                  <button id="button-register" disabled={data.isSubmitting}>
                    {/* {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("INVITE")} */}
                    INVITE
                  </button>
                </div>
              </Form>
              {/* </div> */}

            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment >
  )
}

export default InviteFriends