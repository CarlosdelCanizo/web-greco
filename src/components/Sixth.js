import React, { useState, useEffect } from "react"
import { Form, Image, Input, Container, Icon, Radio, FormGroup, Button, Segment, Select } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import noImage from '../assets/no-image.svg'

function Sixth(props) {

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    const [data, setData] = useState(currentPanelState);

    const [isChecked, setChecked] = useState(true)
    const toggle = () => setChecked(!isChecked)

    const [image, setImage] = useState({ preview: '' });
    var currentImageId
    var currentImageName

    const handleInputChange = event => {
        console.log("El puto slider antes:", data.battery)
        setData({ ...data, [event.target.name]: event.target.value });
        console.log("El puto slider despues:", data.battery)
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        event.persist()
        setData({ ...data });
        localStorage.setItem('currentPanelState', JSON.stringify(data))
        activateRedirection()
    }


    //UPLOAD PREVIEW
    const handleImageChange = (event) => {
        setImage({
            preview: URL.createObjectURL(event.target.files[0]),
            raw: event.target.files[0]
        })
        var preview = URL.createObjectURL(event.target.files[0])
        var raw = event.target.files
        localStorage.setItem('imagePreview', JSON.stringify(preview))
        localStorage.setItem('imageRaw', JSON.stringify(raw))

        console.log("lo que vullc", preview, raw)
        console.log(event.target.files[0])
    }

    //SAVE IMAGE TO UPLOAD LATER
    const handleImageUpload = (event) => {
        event.preventDefault();
        event.persist()
        // var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
        // var panelId = (localStorage.getItem('currentIdPanel'))
        // var panelId = "65"
        const data = new FormData()
        data.append('image', image)
        // currentImageId = image.id
        // currentImageName = image.name
        // console.log("IMATGE ID+NAME", currentImageId, currentImageName)
        // console.log("IMATGE preview", image.preview)

        //STORE IMAGE
        localStorage.setItem('image', JSON.stringify(image))
        // localStorage.setItem('currentImageId', JSON.stringify(currentImageId))
        // localStorage.setItem('currentImageName', JSON.stringify(currentImageId))
        console.log("Imatge per guardar:", image)

        // axios.post("http://10.0.10.195:8088/multimedia/upload/" + panelId, data,
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //             "Authorization": access_token
        //         }
        //     })

        //     .then(response => {
        //         if (response.status === 200) {
        //             currentImageId = (response.data.id)
        //             console.log(currentImageId)
        //             // getImages(currentImageId)
        //             throw response
        //         }
        //     })

    }

    //GET IMAGE
    // function getImages(currentImagelId) {
    //     axios.get("http://10.0.10.195:8088/multimedia/" + currentImagelId + "/getImage/")
    //         .then(response => {
    //             if (response.status === 200) {
    //                 // debugger
    //                 console.log(response.data)
    //                 currentImagePath = "http://10.0.10.195:8088/multimedia/" + currentImageId + "/getImage/"
    //                 console.log(currentImagePath)
    //                 throw response;
    //             }
    //         })
    // }

    //REDIRECT
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
                    <Icon name='circle outline' />
                    <Icon name='circle' />
                </div>

                <div id="tittle-panel-registration">
                    <h2>Additional information</h2>
                </div>


                <Form onSubmit={handleFormSubmit}>
                    <div id="register-panel-fields">
                        <Form.Field>
                            <label id="label-panel-six-large">Instalation name</label>
                            <input placeholder='My installation' type="text" name="installationName" id="installation-name"
                                values={data.installationName} onChange={handleInputChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label id="label-panel-six-large">Installation property
                                <select placeholder='Private' name="installationProperty" id="installation-property"
                                    value={data.installationProperty}
                                    onChange={handleInputChange}
                                >
                                    <option id="select-property" values="Public">Public</option>
                                    <option id="select-property" values="Private">Private</option>
                                </select>
                            </label>
                        </Form.Field>
                    </div>

                    <h3 id="subtittle-panel-registration">Installation photography</h3>

                    <div id="image-fields-container">
                        <input icon='folder open outline' type="file" id="upload-img"
                            name="file" placeholder='Search picture...'
                            onChange={handleImageChange} />
                        <Button circular icon="upload" onClick={handleImageUpload} id="upload-img-button">

                        </Button>
                    </div>

                    <div id="image-preview">
                        <h3 id="text-panel-registration-second">Attached pictures</h3>

                        {image.preview ? <img src={image.preview} width="60" height="60" alt="preview" id="preview" />
                            : (<Image src={noImage} height="60" width="60" id="no-image" />)}

                    </div>

                    <h3 id="battery-radio-text"> Do you have a battery?</h3>
                    <div id="battery-radio" >
                        <label id="label-panel-radio">No &nbsp; &nbsp; &nbsp; Yes</label>
                        <Radio toggle type="radio" name="battery" id="battery"
                            checked={isChecked}
                            onChange={handleInputChange}
                            value={data.battery}
                            onClick={toggle}
                        />
                        {/* <Radio toggle /> */}

                        {/* <FormGroup>
                            <Form.Field>
                                <label id="label-panel-radio">Yes</label>
                                <input type="radio" id="panel-radio-button-battery-yes" name="battery"
                                    checked={isChecked}
                                    onClick={toggle} 
                                    value={true}
                                    onChange={handleInputChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label id="label-panel-radio">No</label>
                                <input type="radio" id="panel-radio-button-battery-no" name="battery"
                                    checked={isChecked}
                                    onClick={toggle} 
                                    value={false}
                                    onChange={handleInputChange}
                                />
                            </Form.Field>
                        </FormGroup> */}
                    </div>
                    <div id="battery-observation" >
                        <Form.Field>
                            <label id="label-panel-very-large">Battery Description</label>
                            <input 
                                placeholder='12V 700Ah Upower' type="text" name="batteryDescription" id="battery-description"
                                values={data.batteryDescription} onChange={handleInputChange}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label id="label-panel-very-large">Observations</label>
                            <input placeholder='Observations and comments' type="text" name="observation" id="observation"
                                values={data.observation} onChange={handleInputChange}
                            />
                        </Form.Field>
                    </div>
                    <div id="register-panels-button-container-sixth">
                        <Button id="button-panel-register-previous" as={Link} from="/sixth" to="/fifth">PREVIOUS</Button>
                        <Button id="button-panel-register-next"
                            // as={Link} from="/sixth" to="/finished-panel"
                            type="submit">
                            NEXT {toLocation ? <Redirect from="/sixth" to="/finished-panel" /> : null}
                        </Button>
                    </div>
                </Form>
            </Container>
        </div>
    )
}

export default Sixth