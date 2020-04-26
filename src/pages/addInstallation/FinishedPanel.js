import React, { useState, useEffect } from "react"
import { Card, Button, Row, Col } from 'antd'
import solarPanel from '../../assets/solar-panel.svg'
import { Link } from "react-router-dom"
import axiosConfig from '../../api/axiosConfig'
import './finishedPanel.css'

const FinishedPanel = props => {

    const [myPanel, setMyPanel] = useState({})
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    var panel = JSON.parse(localStorage.getItem('currentPanelState'))
    // var multimedia = JSON.parse(localStorage.getItem('multimedia'))
    // console.log("MULTIMEDIA LOCAL STORAGE", multimedia)
    var currentPanelId = JSON.parse(localStorage.getItem("currentPanelId"))
    var idPanelfromUpload = JSON.parse(localStorage.getItem("idPanelfromUpload"))

    // const myPanel = props.location.myPanel;
    // console.log("MY PANEL DE LAS PROPS", myPanel)
    function getSpecificSolarPanel(id) {
        axiosConfig
            .get('/solarPanel/' + id,
                {
                    headers: {
                        "Authorization": access_token
                    }
                })
            .then(response => {
                const data = response.data
                setMyPanel({ ...data });
                localStorage.setItem('myPanel', JSON.stringify(myPanel))
                localStorage.removeItem("currentPanelId")
            })
    }

    if (currentPanelId > 0 && idPanelfromUpload === null) {
        getSpecificSolarPanel(currentPanelId);
    } else {
        getSpecificSolarPanel(idPanelfromUpload);
    }

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    function addNewPanel() {
        localStorage.setItem('currentPanelId', JSON.stringify(0))
        localStorage.removeItem("currentPanelState")
    }

    return (
        <Row>
            {/* <div id="background-panel-register"> */}
            <Card id="card-panel-register-inside">
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>
                        <h2 id="tittle-consgratulations">Congratulations!</h2>
                        <h2 id="tittle-finished-panel"> Your installation has been </h2>
                        {currentPanelId === null || currentPanelId === 0 ?
                            <h2 id="tittle-finished-panel">added</h2> : <h2 id="tittle-finished-panel">updated</h2>}
                        <h2 id="tittle-finished-panel"> successfully</h2>
                    </div>
                </Col>
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                    <img id="solar-panel" src={solarPanel} />
                </Col>
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                    <div>
                        <Link id="add-another-installation" to="/first" onClick={addNewPanel}>
                            <p>+ Add another installation</p>
                        </Link>
                    </div>
                </Col>
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Link to={
                        {
                            pathname: "/show-panel-details-sider",
                            myPanel: { panel }
                        }
                    }>
                        <Button id="button-panel-finish-next" >
                            SEE YOUR INSTALLATION
                        </Button>
                    </Link>
                </Col>
            </Card>
            {/* </div> */}
        </Row>
    )
}

export default FinishedPanel