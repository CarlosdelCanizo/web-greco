import React, { useState } from 'react';
import axios from 'axios';
import recLogo from "../assets/rect-logo.png";
import { Grid, Segment, Image, Form, Container, Divider } from 'semantic-ui-react';
import spinner from "../assets/spinner.svg";
import { Redirect } from "react-router-dom";

const ConfirmPassword = () => {

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
    axios.put("http://10.0.10.195:8088/users/resetPassword", (body),
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
    <Segment placeholder>
      <Grid id="grid-confirm" stackable columns={2} align='center'>

        <Grid.Column>
          <Container id="container-confirm" fluid>
            <h1 id="title-reset" >CONFIRM YOUR PASSWORD</h1>

            <Divider hidden />

            <div>
              <p id="text-confirm">Enter your mail address and confirm your new password.</p>
            </div>

            <Form onSubmit={handleFormSubmit}>

              <Divider hidden />
              <div id="input-form-fields-confirm">
                <Form.Field>
                  <label id="label">Email</label>
                  <input placeholder='Your email' type="email" name="email" id="email"
                    values={data.email} onChange={handleInputChange}
                    required />
                </Form.Field>

                <Form.Field>
                  <label id="label">Password</label>
                  <input placeholder='New password' type="password" name="password" id="password"
                    values={data.password} onChange={handleInputChange}
                    required />
                </Form.Field>

                <Form.Field>
                  <label id="label">Confirm password</label>
                  <input placeholder='Confirm password' type="password" name="confirmPassword" id="confirm-password"
                    values={data.confirmPassword} onChange={handleInputChange}
                    required />
                </Form.Field>
              </div>

              <div id="error-confirm-message">
                {data.errorMessage && (<p >{data.errorMessage}</p>)}
              </div>

              <Divider hidden />

              <div id="button-container-confirm">
                <button id="button-reset" disabled={data.isSubmitting}>
                  {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("CONFIRMED")}
                  {toLocation ? <Redirect from="/confirm-password" to="/login" /> : null}
                </button>
              </div>

            </Form>
          </Container>
        </Grid.Column>

        <Grid.Column id="background" only='computer'>
          <div id="logo">
            <Image id="logo" src={recLogo} />
          </div>
        </Grid.Column>

      </Grid>
    </Segment >
  );
}

export default ConfirmPassword;