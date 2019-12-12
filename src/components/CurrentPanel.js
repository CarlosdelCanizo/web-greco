import React, { useState, useEffect } from "react"
import { Form, Image, Input, Container, Icon, Radio, FormGroup, Button, Segment } from 'semantic-ui-react'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import noImage from '../assets/no-image.svg'
import Solar from '../assets/solar.jpg'

function CurrentPanel(props) {

    const [panel, setPanel] = useState([])
    var imageReload = (JSON.parse(localStorage.getItem("image")))
    console.log("Imatge local:", imageReload)
    var imagePreview = (JSON.parse(localStorage.getItem("imagePreview")))
    // var imagePreview = URL.createObjectURL(imageReload[0])
    // var imageRaw = imageReload.raw.files[0]

    console.log("Imatge preview y raw:", imagePreview)

    useEffect(() => {
        const fetchData = async () => {
            var currentIdPanel = (localStorage.getItem('currentPanelId'))
            var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
            const result = await axios(
                'http://10.0.10.195:8088/solarPanel/' + currentIdPanel,
                {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": access_token
                    }
                }
            );
            setPanel(result.data);
        };
        fetchData();
    }, []);



    // var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    // const [data, setData] = useState(currentPanelState);

    // const [isChecked, setChecked] = useState(true)
    // const toggle = () => setChecked(!isChecked)

    // const [image, setImage] = useState({ preview: '' });
    // var currentImageId
    // var currentImageName

    // const handleInputChange = event => {
    //     setData({ ...data, [event.target.name]: event.target.value });
    // };

    // const handleFormSubmit = event => {
    //     event.preventDefault();
    //     event.persist()
    //     setData({ ...data });
    //     localStorage.setItem('currentPanelState', JSON.stringify(data))
    //     activateRedirection()
    // }


    //UPLOAD IMAGE
    // const handleImageChange = (event) => {
    //     setImage({
    //         preview: URL.createObjectURL(event.target.files[0]),
    //         raw: event.target.files[0]
    //     })

    //     console.log(event.target.files[0])
    // }

    // const handleImageUpload = (event) => {
    //     event.preventDefault();
    //     event.persist()
    //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    //     // var panelId = (localStorage.getItem('currentIdPanel'))
    //     // var panelId = "65"
    //     const data = new FormData()
    //     data.append('image', image)
    //     currentImageId = image.id
    //     currentImageName = image.name
    //     console.log("IMATGE ID+NAME", currentImageId, currentImageName)

    //FAKE IMAGE REAL
    // localStorage.setItem('image', JSON.stringify(image))
    // localStorage.setItem('currentImageId', JSON.stringify(currentImageId))
    // localStorage.setItem('currentImageName', JSON.stringify(currentImageName))

    // console.log("Imatge per guardar:", image)

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

    // }

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

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    return (

        <Container id="container-current-panel">
            <React.Fragment>
                <div id="tittle-current-panel">
                    <h2>USER INSTALLATION</h2>
                </div>

                <div id="image-current-panel">
                    <img src={Solar} width="200" height="200" alt="preview" id="preview" />
                </div>

                {<div id="show-current-panel">

                    Installation name: <b>{panel.installationName}</b>
                    <br />
                    Installation property: <b>{panel.installationProperty}</b>
                    <br />
                    Installation Type: <b>{panel.installationType}</b>
                    <br />
                    Latitude: <b>{panel.lat}</b>
                    <br />
                    Longitude: <b>{panel.lon}</b>
                    <br />
                    Tacking orientation: <b>{panel.panelTrackingOrientation}</b>
                    <br />
                    Tacking inclination: <b>{panel.panelTrackingInclination}</b>
                    <br />
                    Inclination: <b>{panel.inclination}</b>
                    <br />
                    Orientation: <b>{panel.orientation}</b>
                    <br />
                    Surface: <b>{panel.surface}</b>
                    <br />
                    Technology used: <b>{panel.technologyUsed}</b>
                    <br />
                    Electrical capacity: <b>{panel.electricalCapacity}</b>
                    <br />
                    Inverter capacity: <b>{panel.inverterCapacity}</b>
                    <br />
                    Commisioning Date: <b>{panel.commissioningDate}</b>
                    <br />
                    Battery: <b>{panel.battery}</b>
                    <br />
                    Battery description: <b>{panel.batteryDescription}</b>
                    <br />
                    Observation: <b>{panel.observation}</b>

                </div>
                }

                <Button id="button-panel-show-map" as={Link} from="/current-panel" to="/public-mapping" >
                    SHOW MAP
                </Button>
            </React.Fragment>
        </Container>
    )
}

export default CurrentPanel