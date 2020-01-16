import React from "react"
import { useState, useEffect } from "react"
import { Card, Button, Row, Col } from 'antd'
import solarPanel from '../../assets/solar-panel.svg'
import { Link } from "react-router-dom"
import axios from 'axios'
// import qs from 'qs'
import './finishedPanel.css'

function FinishedPanel(props) {

    // const userInfo = {
    //     username: "",
    //     email: "",
    //     isAuthenticated: false,
    //     isPreviouslyLogged: false
    // }


    // useEffect(() => {
    //     getMyUserInfo()
    //     console.log("CRIDA getMyUserInfo:", userInfo)
    // }, []);


    // var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    // const [userProfile, setUserProfile] = useState(userInfo);
    // var currentPanelId

    // GET MY USER INFO
    // function getMyUserInfo() {
    //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    //     axios.get("http://10.0.10.195:8088/users/getMyUserInfo",
    //         {
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": access_token
    //             }
    //         })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 return response;
    //             }
    //         })
    //         .then(response => {
    //             setUserProfile(
    //                 userProfile.username = response.data.username,
    //                 userProfile.email = response.data.email,
    //                 userProfile.isAuthenticated = true,
    //                 userProfile.isPreviouslyLogged = response.data.isPreviouslyLogged
    //             )
    //             console.log("Açi está be?", userProfile)
    //         })
    //         .catch(error => {

    //         });
    // }

    //POST PANEL

    function postPanel() {
        // console.log("USERPROFILE:", userProfile)
        // console.log("useInfo:", userInfo)
        var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
        // var body = {
        //     photographOfInstallation: "Txema",
        //     solarPanel: currentPanelState
        // }
        const body = {
            photographOfInstallation: "Txema.Sanchis",
            solarPanel:
            {
                lat: 39.8896017,
                lon: -0.0754226,
                panelTrackingOrientation: false,
                panelTrackingInclination: false,
                orientation: 68,
                inclination: 34,
                commissioningDate: "2019-12-12",
                multimedia: [],
                technologyUsed: "Policristalino",
                surface: 15,
                electricalCapacity: 1450,
                inverterCapacity: 1450,
                battery: true,
                batteryDescription: "Ion-litio",
                observation: "Prueba Txema",
                installationName: "Txema´s house",
                installationProperty: "Private",
                installationType: "Autoconsumo"

            }
        }
        axios.post("http://10.0.10.195:8088/solarPanel", (body),
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": access_token
                }
            })
            .then(response => {
                if (response.status === 200) {
                    const currentPanelId = response.data
                    console.log("LO QUE VOLS:", currentPanelId)
                    localStorage.setItem('currentPanelId', currentPanelId)
                    // uploadImage()
                    activateRedirection()
                    console.log(response)
                }
            })
            .catch(function (error) {
                console.log("RESPUESTA ERROR:", error);
            });
    }

    //UPLOAD IMAGE
    // function uploadImage() {
    //     var imageGuardada = localStorage.getItem('image')
    //     var imageName = localStorage.getItem('imageName')
    //     // var panelId = (localStorage.getItem('currentIdPanel'))
    //     var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
    //     const data = new FormData()
    //     data.append('image', imageGuardada)
    //     // imageName = imageGuardada.name
    //     console.log("IMATGE NAME:", imageName)
    //     axios.post("http://10.0.10.195:8088/multimedia/upload/" + currentPanelId, data,
    //         {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //                 "Authorization": access_token
    //             }
    //         })

    //         .then(response => {
    //             if (response.status === 200) {
    //                 // currentImageId = (response.data.id)
    //                 // console.log(currentImageId)
    //                 // // getImages(currentImageId)
    //                 // var panelId = response.data.id;
    //                 console.log("YUJUUU", response);
    //                 // localStorage.setItem('currentIdPanel', panelId)
    //                 throw response
    //             }
    //         })

    // }

    // uploadImage()

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    return (
        <Row>
            <div id="background-panel-register">
                <Card id="card-panel-register-inside">
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="tittle-panel-registration">
                            <h2>Your installation has been added successfully</h2>
                        </div>
                    </Col>

                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <img id="solar-panel" src={solarPanel} />
                    </Col>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="text-finished-panel-registration">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Ut tincidunt est vel diam tincidunt tristique
                            </p>
                        </div>
                    </Col>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div >
                            <Link id="add-another-installation" to="/first">
                                <p>+ Add another installation</p>
                            </Link>
                        </div>
                    </Col>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Link to="/private-mapping">
                            <Button id="button-panel-finish-next"
                                onClick={postPanel}>
                                FINALIZE
                        </Button>
                        </Link>
                    </Col>
                </Card>
            </div>
        </Row>
    )
}

export default FinishedPanel