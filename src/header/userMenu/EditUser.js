import React from "react"
import { Card, Form, Input, Divider, Alert, message, Switch, Button, Icon, Row, Col } from 'antd'
import axiosConfig from '../../api/axiosConfig'
import Header from '../Header'
import { Link } from "react-router-dom";
import "./editUser.css"
import PrivateMapping from '../../pages/mapping/PrivateMapping'

const EditUser = () => {

  const [data, setData] = React.useState({
    username: "",
    email: "",
    notifications: true,
    isSubmitting: false,
    errorMessage: null,
  }
  );

  const success = () => {
    message.warning('If you change your email, you need to loggin again', 5, onClose = { onClose });
  };

  function removeCredentials() {
    localStorage.removeItem("access_token")
    localStorage.removeItem("expires_in")
    localStorage.removeItem("refresh_token")
    window.location.reload()
  }

  function onChange(checked) {
    // console.log("switch to", checked);
    setData({ ...data, notifications: checked });
  }

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });
    updateUser()
  };

  // UPDATE USER
  function updateUser() {
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem("access_token"))
    var body = {
      email: data.email,
      username: data.username,
      notifications: data.notifications
    }
    axiosConfig.put("/users", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        if (response.status === 200) {
          activateRedirection()
          success()
        }
        throw response
      })
      .catch(error => {
        console.log("error", error)
        if (error === undefined) {
          // NetWork Error  
          setData({ ...data, errorMessage: error.response.data.message });
        }
        if (error !== undefined && error.response !== undefined) {
          if (error.response.data.status === 400) {
            // bad credentials  
            setData({ ...data, errorMessage: error.response.data.message });
          }

          if (error.response.data.status === 404) {
            //  not found  
            setData({ ...data, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 500) {
            // Server error  
            setData({ ...data, errorMessage: error.response.data.message });
          }
        }
      });
  }

  //Redirect
  const [toLocation, setLocation] = React.useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  const onClose = () => {
    if (data.email && data.email !== "") {
      removeCredentials()
    } else {
      window.location.reload()
    }

  };

  const isEnabled = (data.username && data.username !== "" && data.isSubmitting === false
    || data.email && data.email !== "" && data.isSubmitting === false)

  return (
    <React.Fragment>
      {
        (window.innerWidth < 600 && window.innerWidth < 768) ?
          <Header />
          :
          (null)
      }
      <Row>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} >
          <PrivateMapping />
        </Col>
      </Row>
      <Card id="edit-details-menu-inside">
        <Link to="/private-mapping">
          <Button id="menu-close-button">
            <Icon type="close" id="icon-x" />
          </Button>
        </Link>
        <Form onSubmit={handleFormSubmit}>
          <h1 id="edit-details-tittle">Edit details</h1>
          <Divider />
          <div id="edit-details-form-fields">
            <Form.Item>
              <div id="div-edit-user-background">
                <label id="edit-label">Username</label>
                <Input
                  placeholder="Username"
                  name="username"
                  id="edit-username"
                  values={data.username}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Item>
            <Divider id="between-inputs" />
            <Form.Item>
              <div id="div-edit-user-background">
                <label id="edit-label">Email</label>
                <Input
                  type="email"
                  placeholder="Email"
                  name="email"
                  id="edit-email"
                  values={data.email}
                  onChange={handleInputChange}
                />
              </div>
            </Form.Item>
          </div>
          <div id="turn-notifications">
            <Switch
              defaultChecked
              onChange={onChange}
              name="notifications"
              id="notifications"
            />
            {data.notifications ?
              (<p id="turn-notifications-text">Turn OFF notifications</p>) :
              (<p id="turn-notifications-text">Turn ON notifications</p>)}
          </div>
          <div id="error-edit-user-message">
            {data.errorMessage && (<p id="error-message">{data.errorMessage}</p>)}
          </div>
          <div id="success-edit-user-message">
            {toLocation ?
              <Alert id="edit-success-alert"
                message="Success!"
                description={(data.username && data.email ? ("New username: " + data.username + "  &  " + "New email: " + data.email)
                  : (data.username ? ("New username: " + data.username) : ("New email: " + data.email)))
                }
                type="success"
                showIcon
                closable
                onClose={onClose}
              /> : null}
          </div>
          <div>
            <Button
              id="edit-details-save-button"
              disabled={!isEnabled || data.isSubmitting}
              onClick={handleFormSubmit}
            >SAVE CHANGES
              </Button>
          </div>
        </Form>
      </Card>
    </React.Fragment >
  )

}

export default EditUser