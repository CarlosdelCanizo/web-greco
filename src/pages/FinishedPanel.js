import React from "react"
import { useState, useEffect } from "react"
import { Image, Container } from 'semantic-ui-react'
import solarPanel from '../assets/solar-panel.svg'
import { Redirect, Link } from "react-router-dom"
import { Button } from 'semantic-ui-react'
import axios from 'axios'

function FinishedPanel(props) {

    const userInfo = {
        username: "",
        email: "",
        isAuthenticated: false,
        isPreviouslyLogged: false
    }

    useEffect(() => {
        getMyUserInfo()
        console.log("CRIDA getMyUserInfo:", userInfo)
    }, []);


    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    const [userProfile, setUserProfile] = useState(userInfo);
    var currentPanelId

    // GET MY USER INFO
    function getMyUserInfo() {
        var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
        axios.get("http://10.0.10.195:8088/users/getMyUserInfo",
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": access_token
                }
            })
            .then(response => {
                if (response.status === 200) {
                    return response;
                }
            })
            .then(response => {
                setUserProfile(
                    userProfile.username = response.data.username,
                    userProfile.email = response.data.email,
                    userProfile.isAuthenticated = true,
                    userProfile.isPreviouslyLogged = response.data.isPreviouslyLogged
                )
                console.log("Açi está be?", userProfile)
            })
            .catch(error => {

            });
    }

    //POST PANEL

    function postPanel() {
        console.log("USERPROFILE:", userProfile)
        console.log("useInfo:", userInfo)
        var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
        var body = {
            photographOfInstallation: "Txema",
            solarPanel: currentPanelState
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
                    currentPanelId = response.data.id
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
    function uploadImage() {
        var imageGuardada = localStorage.getItem('image')
        var imageName =  localStorage.getItem('imageName')
        // var panelId = (localStorage.getItem('currentIdPanel'))
        var access_token = 'Bearer ' + (localStorage.getItem('access_token'))
        const data = new FormData()
        data.append('image', imageGuardada)
        // imageName = imageGuardada.name
        console.log("IMATGE NAME:", imageName)
        axios.post("http://10.0.10.195:8088/multimedia/upload/" + currentPanelId, data,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": access_token
                }
            })

            .then(response => {
                if (response.status === 200) {
                    // currentImageId = (response.data.id)
                    // console.log(currentImageId)
                    // // getImages(currentImageId)
                    // var panelId = response.data.id;
                    console.log("YUJUUU", response);
                    // localStorage.setItem('currentIdPanel', panelId)
                    throw response
                }
            })

    }

    uploadImage()

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    return (
        <div id="background-panel-register">
            <Container id="container-panel-register-inside">

                <div id="tittle-finished-panel">
                    <h2>Your installation has been added successfully</h2>
                </div>

                <div id="text-finished-panel-registration">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut tincidunt est vel diam tincidunt tristique
                    </p>
                </div>
                <Image id="solar-panel" src={solarPanel} />

                <Button id="button-panel-finish-next"
                     as={Link} from="/finished-panel" to="/current-panel" 
                    onClick={postPanel}>
                    FINALIZE
                </Button>

            </Container>
        </div>

    )
}

export default FinishedPanel