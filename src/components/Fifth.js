import React, { useState } from "react";
import { Form, Container, Icon, Image, Button } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";
import noImage from '../assets/no-image.svg'


const Fifth = (props) => {

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    const [data, setData] = useState(currentPanelState);

    const handleInputChange = event => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        event.persist()
        setData({ ...data, isSubmitting: true, errorMessage: null });
        localStorage.setItem('currentPanelState', JSON.stringify(data))
        activateRedirection()
    }

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    return (
        <div id="background-panel-register">
            <Container id="container-panel-register-inside">

                <div id="pagination">
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle' />
                    <Icon name='circle outline' />
                </div>

                <div id="tittle-panel-registration">
                    <h2>Panel Inclination</h2>
                </div>

                <div id="text-panel-registration-second">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut tincidunt est vel diam tincidunt tristique
                    </p>
                </div>

                <Form onSubmit={handleFormSubmit}>
                    <div id="register-panel-fields-second">
                        <Form.Field>
                            <label id="label-panel-orientation-inclination">Degrees</label>
                            <input placeholder='from 0 to 90 °' type="number" name="inclination" id="inclination"
                                values={data.inclination} onChange={handleInputChange}
                                required />
                        </Form.Field>
                    </div>

                    <div>
                        <Image src={noImage} height="307" width="448" id="register-panel-image-fifth" />
                    </div>

                    {/* <div>
                        <p id="text-panel-registration">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Ut tincidunt est vel diam tincidunt tristique
                        </p>
                    </div> */}
                    <div id="register-panels-button-container-fifth">
                        <Button id="button-panel-register-previous" as={Link} from="/fifth" to="/fourth">PREVIOUS</Button>
                        <Button id="button-panel-register-next" type="submit">
                            NEXT {toLocation ? <Redirect from="/fifth" to="/sixth" /> : null}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Fifth