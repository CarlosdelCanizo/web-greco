import React, { useState } from "react";
import recLogo from "../assets/rect-logo.png";
import { Grid, Segment, Card, Form, Input, Button, Image, Divider, Pagination, Checkbox, TextArea, Label, Container } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

function DeletePanel(props) {

    //Required data
    const [electrical_capacity, set_electrical_capacity] = useState("");
    const [surface, set_surface] = useState("");
    const [lat, set_lat] = useState("");
    const [lon, set_lon] = useState("");
    const [orientation, set_orientation] = useState("");
    const [inclination, set_inclination] = useState("");
    const [panelTrackingOrientation, set_tracking_orientation] = useState(false);
    const [panelTrackingInclination, set_tracking_inclination] = useState(false);
    //Optional data
    const [technologyUsed, set_technology_used] = useState("");
    const [inverterCapacity, set_inverter_capacity] = useState("");
    const [commissioningDate, set_commissioning_date] = useState("");
    const [comment, set_comment] = useState("");
    const [battery, set_battery] = useState("");
    const [batteryDescription, set_battery_description] = useState("");
    const [installationName, set_installation_name] = useState("");
    const [installationProperty, set_installation_property] = useState("");
    const [installationType, set_installation_Type] = useState("");

    const handleOrientation = () => set_tracking_orientation(!panelTrackingOrientation)
    const handleInclination = () => set_tracking_inclination(!panelTrackingInclination)

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    //GET PANEL BY ID
    function getPanelbyId() {
        var panelId = "32"
        var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
        axios.get("http://10.0.10.195:8088/solarPanel/"
            , {
                params: panelId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": access_token
                }
            })

            .then(response => {
                if (response.status === 200) {
                    // activateRedirection()
                }
            })

            .catch(function (error) {
                console.log(error);
            });

    }

    //DELETE PANEL BY ID
    function deletePanelbyId() {
        var panelId = "32"
        var access_token = 'Bearer ' + (localStorage.getItem('access_token'))

        axios.delete("http://10.0.10.195:8088/solarPanel/"
            , {
                params: panelId
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": access_token
                }
            })

            .then(response => {
                if (response.status === 200) {
                    // activateRedirection()
                }
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <Segment placeholder>
            <Grid id="grid-register" stackable columns={2} align='center'>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column >
                        <Card id="card-register">
                            <Image src={recLogo} />

                            <h3>DELETE your solar panel</h3>
                            <Divider hidden />
                            <div id="scrollable" >
                                <Container fluid textAlign='left'>
                                    <Form>

                                        <Form.Field>
                                            <Label>Electrical capacity</Label>
                                            <Input size='large' placeholder='Electrical capacity' type="number"
                                                id="electrical_capacity" name="electrical_capacity"
                                                value={electrical_capacity} onChange={e => { set_electrical_capacity(e.target.value); }}
                                                required />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Surface</Label>
                                            <Input size='large' placeholder='Surface' type="number"
                                                id="surface" name="surface"
                                                value={surface} onChange={e => { set_surface(e.target.value); }}
                                                required />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Orientation</Label>
                                            <Input size='large' placeholder='Orientation' type="number"
                                                id="orientation" name="orientation"
                                                value={orientation} onChange={e => { set_orientation(e.target.value); }}
                                                required />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Inclination</Label>
                                            <Input size='large' placeholder='Inclination' type="number"
                                                id="inclination" name="inclination"
                                                value={inclination} onChange={e => { set_inclination(e.target.value); }}
                                                required />
                                        </Form.Field>
                                        <Divider hidden />

                                        <Grid columns={2} textAlign='center'>
                                            <Grid.Row verticalAlign='middle'>
                                                <Grid.Column>
                                                    <Form.Field>
                                                        <Checkbox label='Panel tracking orientation' onClick={handleOrientation}
                                                            id="panelTrackingOrientation" name="panelTrackingOrientation"
                                                            checked={panelTrackingOrientation} />
                                                    </Form.Field>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Form.Field>
                                                        <Checkbox label='Panel tracking inclination' onClick={handleInclination}
                                                            id="panelTrackingInclination" name="panelTrackingInclination"
                                                            checked={panelTrackingInclination} />
                                                    </Form.Field>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>
                                        <Divider hidden />

                                        <Grid columns={2} textAlign='left'>
                                            <Grid.Row verticalAlign='middle'>
                                                <Grid.Column>
                                                    <Form.Field>
                                                        <Label>Latitude</Label>
                                                        <Input size="large" placeholder='Latitude' type="number"
                                                            id="lat" name="lat"
                                                            value={lat} onChange={event => { set_lat(event.target.value); }}
                                                            required />
                                                    </Form.Field>
                                                </Grid.Column>
                                                <Grid.Column>
                                                    <Form.Field>
                                                        <Label>Longitude</Label>
                                                        <Input size="large" placeholder='Longitude' type="number"
                                                            id="lon" name="lon"
                                                            value={lon} onChange={event => { set_lon(event.target.value); }}
                                                            required />
                                                    </Form.Field>
                                                </Grid.Column>
                                            </Grid.Row>
                                        </Grid>

                                        <Divider hidden />
                                        <Form.Field>
                                            <Label >Technology used</Label>
                                            <Input size="large" placeholder='Technology used' type="text"
                                                id="technologyUsed" name="technologyUsed"
                                                value={technologyUsed} onChange={event => { set_technology_used(event.target.value); }}
                                            />
                                            <Divider hidden />
                                        </Form.Field>
                                        <Form.Field>
                                            <Label>Inverter capacity used</Label>
                                            <Input size="large" placeholder='Inverter capacity used' type="number"
                                                id="inverterCapacity" name="inverterCapacity"
                                                value={inverterCapacity} onChange={event => { set_inverter_capacity(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>commissioning date</Label>
                                            <Input size="large" placeholder='Comisionig date' type="data"
                                                id="commissioningDate" name="commissioningDate"
                                                value={commissioningDate} onChange={event => { set_commissioning_date(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Comment</Label>
                                            <TextArea size="large" placeholder='Comment' type="text"
                                                id="comment" name="comment"
                                                value={comment} onChange={event => { set_comment(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Battery</Label>
                                            <Input size="large" placeholder='Battery' type="number"
                                                id="battery" name="battery"
                                                value={battery} onChange={event => { set_battery(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Battery description</Label>
                                            <Input size="large" placeholder='Battery description' type="text"
                                                id="batteryDescription" name="batteryDescription"
                                                value={batteryDescription} onChange={event => { set_battery_description(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Installation name</Label>
                                            <Input size="large" placeholder='Installation name' type="text"
                                                id="installationName" name="installationName"
                                                value={installationName} onChange={event => { set_installation_name(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Installation property</Label>
                                            <Input size="large" placeholder='Installation property' type="text"
                                                id="installationProperty" name="installationProperty"
                                                value={installationProperty} onChange={event => { set_installation_property(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />
                                        <Form.Field>
                                            <Label>Installation type</Label>
                                            <Input size="large" placeholder='Installation type' type="text"
                                                id="installationType" name="installationType"
                                                value={installationType} onChange={event => { set_installation_Type(event.target.value); }}
                                            />
                                        </Form.Field>
                                        <Divider hidden />

                                        <Segment.Group className="ui basic segment" horizontal>
                                            <Button as={Link} name="" to="">
                                                Cancel {toLocation ? <Redirect to="/finish" /> : null}
                                            </Button>
                                            <Button onClick={deletePanelbyId}>
                                                Delete
                                            </Button>
                                        </Segment.Group>
                                    </Form>
                                </Container>
                            </div>
                        </Card>
                    </Grid.Column>
                    <Grid.Column only='computer'>
                        <Image src={recLogo} size="large" />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    );
}

export default DeletePanel;