import React from "react"
import { useState } from "react"
import { Card, Button, Row, Col } from 'antd'
import solarPanel from '../../assets/solar-panel.svg'
import { Link } from "react-router-dom"

import './finishedPanel.css'

const FinishedPanel = props => {

    var currentPanelId = JSON.parse(localStorage.getItem("currentPanelId"))
    localStorage.removeItem("currentPanelId")
    localStorage.removeItem("currentPanelState")

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
                        <div>
                            <h2 id="tittle-finished-panel">Your installation has been </h2>
                            {currentPanelId === null || currentPanelId === 0 ?
                                <h2 id="tittle-finished-panel">added</h2> : <h2 id="tittle-finished-panel">updated</h2>}
                            <h2 id="tittle-finished-panel"> successfully</h2>
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
                            <Button id="button-panel-finish-next">
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