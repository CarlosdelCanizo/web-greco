import React, { useState } from 'react'
import axios from 'axios'
import recLogo from "../assets/rect-logo.png"
import { Grid, Segment, Container, Image, Form, Divider } from 'semantic-ui-react'
import spinner from "../assets/spinner.svg";
import { Redirect } from "react-router-dom";

const ResetPassword = () => {

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

    return (

        <Segment placeholder>
            <Grid id="grid-login" stackable columns={2} align='center'>

                <Grid.Column>
                    <Container id="container-reset" fluid>
                        <h1 id="title-reset" >RESET YOUR PASSWORD</h1>
                        <Divider hidden />

                        <div>
                            <p id="text-reset">Enter the email address you used to register. We will send you an email to reset your password.</p>
                        </div>

                        <Form onSubmit={handleFormSubmit}>
                            <div id="input-form-fields-reset">
                                <Form.Field>
                                    <label id="label">Email</label>
                                    <input placeholder='Email' type="email" name="email" id="email"
                                        values={data.email} onChange={handleInputChange}
                                        required />
                                </Form.Field>
                            </div>

                            <div id="error-reset-message">
                                {data.errorMessage && (<p >{data.errorMessage}</p>)}
                            </div>
                            <Divider hidden />
                            <div id="button-container-reset">
                                <button id="button-reset" disabled={data.isSubmitting}>
                                    {data.isSubmitting ? (<img src={spinner} alt="SENDING..." />) : ("RESET")}
                                    {toLocation ? <Redirect from="/reset-password" to="/login" /> : null}
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

export default ResetPassword