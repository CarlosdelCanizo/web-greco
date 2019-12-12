import React, { useState } from "react";
import { Form, Container, Icon, Image, Checkbox, Button } from 'semantic-ui-react';
import { Redirect, Link } from "react-router-dom";
import noImage from '../assets/no-image.svg'

const Third = (props) => {

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    const [data, setData] = useState(currentPanelState);
    const [panelTrackingOrientation, set_tracking_orientation] = useState(false);
    const [panelTrackingInclination, set_tracking_inclination] = useState(false);

    const handleOrientation = () => set_tracking_orientation(!panelTrackingOrientation)
    const handleInclination = () => set_tracking_inclination(!panelTrackingInclination)

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
                    <Icon name='circle' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                </div>

                <div id="tittle-panel-registration">
                    <h2>Panel Tracking</h2>
                </div>

                <div id="text-panel-registration-second">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut tincidunt est vel diam tincidunt tristique
                    </p>
                </div>

                <Form onSubmit={handleFormSubmit}>
                    <div id="register-panel-fields-second">
                        <Form.Field>
                            <Checkbox label='Orientation'
                                id="panelTrackingOrientation" name="panelTrackingOrientation"
                                onClick={handleOrientation}
                                checked={panelTrackingOrientation ? (data.panelTrackingOrientation = true) : (data.panelTrackingOrientation = false)}
                                onChange={handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='Inclination'
                                id="panelTrackingInclination" name="panelTrackingInclination"
                                onClick={handleInclination}
                                checked={panelTrackingInclination ? (data.panelTrackingInclination = true) : (data.panelTrackingInclination = false)}
                                onChange={handleInputChange}
                            />
                        </Form.Field>
                    </div>

                    <div>
                        <Image src={noImage} height="307" width="448" />
                    </div>

                    {/* <div>
                        <p id="text-panel-registration">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Ut tincidunt est vel diam tincidunt tristique
                        </p>
                    </div> */}

                    <div id="register-panels-button-container-third">
                        <Button id="button-panel-register-previous" as={Link} from="/third" to="/second">PREVIOUS</Button>
                        <Button id="button-panel-register-next" type="submit">
                            NEXT {toLocation ? <Redirect from="/third" to="/fourth" /> : null}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Third