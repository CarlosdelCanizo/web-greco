import React, { useState, useEffect, useRef } from "react";
import { Form, Container, Icon, Button } from 'semantic-ui-react';
import MapsCoords from "./MapsCoords";
import { Link, Redirect } from "react-router-dom";
// import { useFormInput } from '../hooks/useFormInput'

const Second = (props) => {

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    var currentCoords = JSON.parse(localStorage.getItem("coords"));
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
    var lat = "39.8714243295929"
    var lon = "-0.06466403603553773"

    // useEffect(() => {
    //     setCoords({
    //         lat: currentCoords.lat,
    //         lon: currentCoords.lng
    //     });
    // }, [currentCoords]);

    // const updateField = event => {
    //     setCoords({
    //         ...coords,
    //         [event.target.name]: event.target.value
    //     });
    // };

    // const [lat, setLat] = useState(props.currentCoords);
    // const [lon, setLon] = useState(props.currentCoords);

    // const updateCoords = () => {
    //     currentCoords = JSON.parse(localStorage.getItem("coords"));
    //     setLat(currentCoords.lat)
    //     setLon(currentCoords.lng)           
    // }

    // updateCoords()

    // useEffect(() => {      
    //     updateCoords()

    //     console.log("upadateCoords:", lat, lon)
    // window.addEventListener("onClick", updateCoords)

    // return () => {
    //     window.removeEventListener("onClick", updateCoords)
    // }
    // }, []); //coordinates


    // const handleInputChange = event => {
    //     setData({ ...data, [event.target.name]: event.target.value });
    // };

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
                    <Icon name='circle' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                </div>

                <div id="tittle-panel-registration">
                    <h2>Installation location</h2>
                </div>

                <div id="text-panel-registration-second">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut tincidunt est vel diam tincidunt tristique
                    </p>
                </div>

                <Form onSubmit={handleFormSubmit}>
                    <div id="register-panel-fields-second">
                        <Form.Field>
                            <label id="label-panel">Latitude</label>
                            <input
                                type="text" name="lat" id="lat"
                                value={lat}
                                readOnly={true}
                                // onChange={updateField}
                                required />
                        </Form.Field>

                        <Form.Field>
                            <label id="label-panel">Longitude</label>
                            <input
                                type="text" name="lon" id="lon"
                                value={lon}
                                readOnly={true}
                                // onChange={updateField}
                                required />
                        </Form.Field>
                    </div>
                    <div className="coords-container">
                        <MapsCoords
                            zoom={8}
                            center={{ lat: 39.8714243295929, lng: -0.06466403603553773 }}
                        />
                    </div>

                    {/* <div>
                        <p id="text-panel-registration">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Ut tincidunt est vel diam tincidunt tristique
                        </p>
                    </div> */}
                    <div id="register-panels-button-container-second">
                        <Button id="button-panel-register-previous" as={Link} from="/second" to="/first">PREVIOUS</Button>
                        <Button id="button-panel-register-next" type="submit" >
                            NEXT {toLocation ? <Redirect from="/second" to="/third" /> : null}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Second