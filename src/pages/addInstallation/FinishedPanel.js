import React from "react"
import { useState } from "react"
import { Card, Button, Row, Col } from 'antd'
import solarPanel from '../../assets/solar-panel.svg'
import { Link } from "react-router-dom"
import axios from 'axios'

import './finishedPanel.css'

function FinishedPanel() {

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