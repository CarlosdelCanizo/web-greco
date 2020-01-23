import React, { useState } from "react"
import { Card, Input, Form, Alert, Divider } from 'antd';
import Header from '../Header'
import "../Header.css"
import axios from 'axios'
import "./editUser.css"

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
          <h1 id="edit-details-tittle" >INVITE A FRIEND</h1>
          <Divider />
          <div>
            <p id="enter-email-text">Enter the email address of your friend!</p>
          </div>
          <Form onSubmit={handleFormSubmit} >
            <div id="edit-details-form-fields">
              <Form.Item>
                <label id="edit-label">Friend´s Email</label>
                <Input placeholder="Email" type="email" name="email" id="edit-email"
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
              <button id="edit-details-save-button" disabled={data.isSubmitting}>
                {/* {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("INVITE")} */}
                INVITE
                  </button>
            </div>
          </Form>
          {/* </div> */}
        </Card>
      </div>
    </React.Fragment >
  )
}

export default InviteFriends