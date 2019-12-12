import React, { useState, useEffect } from "react";
import recLogo from "../assets/rect-logo.png";
import { Grid, Segment, Card, Form, Input, Button, Image, Divider, Checkbox, Pagination, Imagen } from 'semantic-ui-react';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

function UploadImages(props) {

    const [image, setImage] = useState("");
    var currentImageId
    var currentImagePath

    
    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    //UPLOAD IMAGE
    function onChangeHandler(event) {
        console.log(event.target.files[0])
        setImage(event.target.files[0])
    }

    function onClickHandler() {
        var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
        var panelId = (localStorage.getItem('currentIdPanel'))
        const data = new FormData()
        data.append('file', image)
        axios.post("http://10.0.10.195:8088/multimedia/upload/" + panelId, data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": access_token
                }
            })

            .then(response => {
                if (response.status === 200) {
                    currentImageId = (response.data.id)
                    console.log(currentImageId)
                    getImages(currentImageId)
                    throw response
                }
            })

    }


    //GET IMAGE
    function getImages(currentImagelId) {
        axios.get("http://10.0.10.195:8088/multimedia/" + currentImagelId + "/getImage/")
            .then(response => {
                if (response.status === 200) {
                    debugger
                    console.log(response.data)
                    currentImagePath = "http://10.0.10.195:8088/multimedia/" + currentImageId + "/getImage/"
                    console.log(currentImagePath)
                    throw response;
                }          
            })

    }

    return (

        <Segment placeholder>
            <Grid id="grid-register" stackable columns={2} align='center'>
                <Grid.Row verticalAlign='middle'>
                    <Grid.Column >
                        <Card id="card-register">
                            <Image src={recLogo} />
                            <Pagination
                                defaultActivePage={2}
                                firstItem={null}
                                lastItem={null}
                                pointing
                                secondary
                                totalPages={3}
                            />
                            <h3>We want to see your solar panel</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur
                                 adipiscing elit, sed eiusmod tempor incidunt
                                  ut labore et dolore magna aliqua. </p>
                            <Divider hidden />
                            <Form>
                                <Grid columns={2} textAlign='centered'>

                                    <Grid.Row padded>
                                        <Input icon='folder open outline' iconPosition='left' type="file"
                                            name="file" placeholder='Search picture...' id="upload-img"
                                            onChange={onChangeHandler} />
                                    </Grid.Row>
                                    <Grid.Row verticalAlign='middle'>
                                        <Button circular icon="upload" onClick={onClickHandler}>

                                        </Button>
                                    </Grid.Row>
                                </Grid>

                                <Divider hidden />
                                <Segment>Attached pictures</Segment>
                      
                                <Divider hidden />

                                <Segment.Group className="ui basic segment" horizontal>
                                    <Button as={Link} name="" to="">
                                        Cancel Next {toLocation ? <Redirect to="/finish" /> : null}
                                    </Button>
                                    <Button as={Link} name="finish" to="/finish">
                                        Next {toLocation ? <Redirect to="/finish" /> : null}
                                    </Button>
                                </Segment.Group>

                            </Form>
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

export default UploadImages;