import React from "react"
import { Card, Form, Input, Divider, Alert } from 'antd'
import axios from 'axios'
import Header from '../Header'
import "./editUser.css"


const EditUser = () => {

  const [data, setData] = React.useState({
    username: "",
    email: ""
  }
  );

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });

    // POST LOGIN
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
    var body = {
      email: data.email,
      username: data.username,
    }
    axios.put("http://10.0.10.195:8088/users", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        if (response.status === 200) {
          return response
        }
        throw response
      })
      .then(response => {
        const res = response.data

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
  const onClose = e => {
    window.location.reload();
  };

  return (
    <React.Fragment>
      <Header />
      <div id="edit-details-outside">
        <Card id="edit-details-menu-inside">
          <Form onSubmit={handleFormSubmit}>
            <h1 id="edit-details-tittle">Edit Details</h1>
            <Divider />
            <div id="input-login-form-fields">
              <Form.Item>
                <label id="label">Username</label>
                <Input placeholder="Username" name="username" id="username"
                  values={data.username} onChange={handleInputChange}
                  required
                />
              </Form.Item>
              <Divider id="between-inputs" />
              <Form.Item>
                <label id="label">Email</label>
                <Input type="email" placeholder="Email" name="email" id="email"
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
                  description="User edited correctly. If you have changed your email, please go back to login"
                  type="success"
                  showIcon
                  closable
                  onClose={onClose}
                /> : null}
            </div>
            <div>
              <button id="edit-details-save-button" >SAVE CHANGES</button>
            </div>
          </Form>
        </Card>
      </div>

    </React.Fragment >
  )

}

export default EditUser