import React, { useState } from "react"
import { Card, Input, Form, Alert, Divider, Button, Icon, Row, Col } from 'antd';
import spinner from "../../assets/spinner.svg";
import '../Header.css'
import axiosConfig from '../../api/axiosConfig'
import './editUser.css'
import { Link } from "react-router-dom";
import PrivateMapping from '../../pages/mapping/PrivateMapping'


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
    axiosConfig.post('/referedUser?email=' + data.email, body,
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
            setData({ ...data, errorMessage: error.response.data.error });
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
    <React.Fragment>
      <Row>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} >
          <PrivateMapping />
        </Col>
      </Row>
      <Card id="edit-details-menu-inside">
        <Link to="/private-mapping-sider">
          <Button id="menu-close-button">
            <Icon type="close" id="icon-x" />
          </Button>
        </Link>
        <h1 id="edit-details-tittle" >Invite friends</h1>
        <Divider />
        <Divider className="transparentDivider" />
        <div>
          <p id="enter-email-text">Enter the email address of your friend!</p>
        </div>
        <Form onSubmit={handleFormSubmit} >
          <div id="edit-details-form-fields">
            <Form.Item>
              <div id="div-edit-user-background">
                <label id="edit-label">Friend´s Email</label>
                <Input
                  placeholder="Email"
                  type="email"
                  name="email"
                  id="edit-email"
                  values={data.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Form.Item>

          </div>
          <div id="error-edit-user-message">
            {data.errorMessage && (<p id="error-message">{data.errorMessage}</p>)}
          </div>
          <div id="success-edit-user-message">
            {toLocation ?
              <Alert
                message="Invitation sent to:"
                description={data.email}
                type="success"
                showIcon
                closable
              /> : null}
          </div>
          <div id="welcome-button-container">
            <Button id="edit-details-save-button"
              onClick={handleFormSubmit}
              disabled={data.isSubmitting}>
              {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("INVITE")}
            </Button>
          </div>
        </Form>
      </Card>
    </React.Fragment >
  )
}

export default InviteFriends