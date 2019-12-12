import React, { useState, useContext } from "react"
import { Form, Image, Container, Icon, Radio, FormGroup, Button } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom";
import noImage from '../assets/no-image.svg'

const First = (props) => {

    const initialPanelState = {
        electrical_capacity: 0,
        surface: 0,
        lat: "",
        lon: "",
        orientation: 0,
        inclination: 0,
        panelTrackingOrientation: false,
        panelTrackingInclination: false,
        technologyUsed: "",
        inverterCapacity: 0,
        commissioningDate: "",
        observation: "",
        battery: true,
        batteryDescription: "",
        installationName: "",
        installationProperty: ""
    };

    const [data, setData] = useState(initialPanelState);
    const [isChecked, setChecked] = useState(false)
    const toggle = () => setChecked(!isChecked)

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
                    <Icon name='circle' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                    <Icon name='circle outline' />
                </div>

                <div id="tittle-panel-registration">
                    <h2>Register your solar installation</h2>
                </div>

                <div id="text-panel-registration">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut tincidunt est vel diam tincidunt tristique</p>
                </div>

                <Form onSubmit={handleFormSubmit}>
                    <div id="register-panel-fields">
                        <Form.Field>
                            <label id="label-panel">Electrical capacity</label>
                            <input placeholder='330 w' type="number" name="electrical_capacity" id="electrical_capacity"
                                values={data.electrical_capacity} onChange={handleInputChange}
                                required />
                        </Form.Field>

                        <Form.Field>
                            <label id="label-panel">Surface</label>
                            <input placeholder='10 m2' type="number" name="surface" id="surface"
                                values={data.surface} onChange={handleInputChange}
                                required />
                        </Form.Field>

                        <Form.Field>
                            <label id="label-panel">Comisionig date</label>
                            <input placeholder='' type="date" name="commissioningDate" id="commissioningDate"
                                values={data.commissioningDate} onChange={handleInputChange}
                                required />
                        </Form.Field>
                    </div>

                    <h3 id="subtittle-panel-registration">Panel type</h3>

                    <div id="technology-used-images">
                        <Image.Group>
                            <Image src={noImage} width="23%" height="23%" id="images-tech-us"/>
                            <Image src={noImage} width="23%" height="23%" id="images-tech-us"/>
                            <Image src={noImage} width="23%" height="23%" id="images-tech-us"/>
                            <Image src={noImage} width="23%" height="23%" id="images-tech-us"/>
                        </Image.Group>
                    </div>

                    <div id="radio-button-group" >
                        <FormGroup>
                            <Form.Field >
                                
                                <label id="label-panel-radio-first">One</label>
                                <input type="radio" id="technology-used" name="technologyUsed"
                                    checked={isChecked ? (data.technologyUsed === "One") : (false)}
                                    onClick={toggle} 
                                    value="One"
                                    onChange={handleInputChange}
                                />                                
                            </Form.Field>
                            <Form.Field>
                                <label id="label-panel-radio-first">Two</label>
                                <input type="radio" id="technology-used" name="technologyUsed"
                                    checked={isChecked ? (data.technologyUsed === "Two") : (false)}
                                    onClick={toggle} 
                                    value="Two"
                                    onChange={handleInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label id="label-panel-radio-first">Three</label>
                                <input type="radio" id="technology-used" name="technologyUsed"
                                    checked={isChecked ? (data.technologyUsed === "Three") : (false)}
                                    onClick={toggle} value="Three"
                                    onChange={handleInputChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label id="label-panel-radio-first">Four</label>
                                <input type="radio" id="technology-used" name="technologyUsed"
                                    checked={isChecked ? (data.technologyUsed === "Four") : (false)}
                                    onClick={toggle} value="Four"
                                    onChange={handleInputChange}
                                />
                            </Form.Field>
                        </FormGroup>
                    </div>

                    <div id="register-panel-inverter">
                        <Form.Field>
                            <label id="label-panel-inverter">Inverter capacity</label>
                            <input placeholder='800 w' type="number" name="inverterCapacity" id="inverter-capacity"
                                values={data.inverterCapacity} onChange={handleInputChange}
                                required />
                        </Form.Field>
                    </div>
                    <div id="register-panels-button-container-first">
                        <Button
                            id="button-panel-register-next"
                            type="submit"
                        >
                            NEXT {toLocation ? <Redirect from="/first" to="/second" /> : null}
                        </Button>
                    </div>

                </Form>
            </Container>
        </div>
    )
}

export default First