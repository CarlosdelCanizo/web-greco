import React, { useState } from "react";
import { Form, Container, Icon, Image, Button } from 'semantic-ui-react';
import { Link, Redirect } from "react-router-dom";
import noImage from '../assets/no-image.svg'

const Fourth = (props) => {

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
                    <Icon name='circle' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                </div>

                <div id="tittle-panel-registration">
                    <h2>Panel Orientation</h2>
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
                            <input placeholder='from 0 to 360 °' type="number" name="orientation" id="orientation"
                                values={data.orientation} onChange={handleInputChange}
                                required />
                        </Form.Field>
                    </div>

                    <div>
                        <Image src={noImage} height="307" width="448" id="register-panel-image-fourth" />
                    </div>

                    {/* <div>
                        <p id="text-panel-registration">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Ut tincidunt est vel diam tincidunt tristique
                        </p>
                    </div> */}
                    <div id="register-panels-button-container-fourth">
                        <Button id="button-panel-register-previous" as={Link} from="/fourth" to="/third">PREVIOUS</Button>
                        <Button id="button-panel-register-next" type="submit">
                            NEXT {toLocation ? <Redirect from="/fourth" to="/fifth" /> : null}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Fourth