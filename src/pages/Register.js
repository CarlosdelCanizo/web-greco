import React, { useState } from "react"
import recLogo from "../assets/rect-logo.png"
import { Container, Grid, Segment, Form, Image, Divider, Checkbox } from 'semantic-ui-react'
import { Redirect } from "react-router-dom"
import axios from 'axios'
import spinner from "../assets/spinner.svg";

const Register = () => {

  const [data, setData] = useState("");
  const [isChecked, setChecked] = useState(true)
  const toggle = () => setChecked(!isChecked)

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    setData({ ...data, isSubmitting: true, errorMessage: null });

    //POST REGISTER
    var body = {
      username: data.username,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword
    }
    axios.post("http://10.0.10.195:8088/register", (body),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('user', data.username)
          localStorage.setItem('email', data.email)
          activateRedirection()
        }
      })
      .catch(error => {
        if (error.response === undefined)
          // NetWork Error  
          setData({ ...data, isSubmitting: false, errorMessage: error.message });
        else {
          if (error.response.data.status === 403)
            // User already exist
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          if (error.response.status === 400)
            //password and confirm password doesn´t match
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.debugMessage });
        }
      });
  };

  //Redirect
  const [toLocation, setLocation] = useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  return (
    <Segment placeholder>
      <Grid id="grid-register" stackable columns={2} align='center'>

        <Grid.Column >
          <Container id="container-register" fluid>
            <h1 id="title-register" >USER REGISTER</h1>
            <Divider hidden />

            <Form onSubmit={handleFormSubmit}>
              <div id="input-form-fields-register">

                <Form.Field>
                  <label id="label">Username</label>
                  <input placeholder='Username' type="text" name="username" id="username"
                    values={data.username} onChange={handleInputChange}
                    required />
                </Form.Field>

                <Form.Field>
                  <label id="label">Email</label>
                  <input placeholder='A valid email' type="email" name="email" id="email"
                    values={data.email} onChange={handleInputChange}
                    required />
                </Form.Field>

                <Form.Field>
                  <label id="label">Password</label>
                  <input placeholder='Password' type="password" name="password" id="password"
                    values={data.password} onChange={handleInputChange}
                    required />
                </Form.Field>

                <Form.Field>
                  <label id="label">Confirm password</label>
                  <input placeholder='Confirm password' type="password" name="confirmPassword" id="confirm-password"
                    values={data.confirmPassword} onChange={handleInputChange}
                    required />
                </Form.Field>

                <div id="error-register-message">
                  {data.errorMessage && (<p >{data.errorMessage}</p>)}
                </div>

                <Divider hidden id="separator-register" />

                <div id="container-checkbox">
                  <Checkbox onChange={toggle}
                    id="checkbox-private-policy" color="red" defaultChecked type="checkbox"
                  />
                  <h5 id="label-checkbox">Accept private policy</h5>
                </div>

                <Divider hidden id="separator-register" />

                <div id="button-container-register">
                  {(isChecked) ?
                    (
                      <button id="button-register">
                        {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("REGISTER")}
                        {toLocation ? <Redirect from="/register" to="/complete-register" /> : null}
                      </button>
                    ) : (<button id="button-register" disabled>ACCEPT TO REGISTER</button>)
                  }
                </div>
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
    </Segment>
  );
}

export default Register