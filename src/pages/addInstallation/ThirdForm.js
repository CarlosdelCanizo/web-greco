import React, { useState } from "react";
import { Form, Card, Col, Row, Checkbox, Button, Divider, Icon } from 'antd';
import { Redirect, Link } from "react-router-dom";
import panelTracking from '../../assets/panel-tracking.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './thirdForm.css'

const ThirdForm = props => {

    var currentPanelOrientation
    var currentPanelInclination

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    if (currentPanelState && currentPanelState.panelTrackingOrientation) {
        currentPanelOrientation = (currentPanelState.panelTrackingOrientation)
    } else {
        currentPanelOrientation = false
    }
    if (currentPanelState && currentPanelState.panelTrackingInclination) {
        currentPanelInclination = (currentPanelState.panelTrackingInclination)
    } else {
        currentPanelInclination = false
    }

    const [data, setData] = useState(currentPanelState);
    const [orientation, setOrientation] = useState(currentPanelOrientation);
    const [inclination, setInclination] = useState(currentPanelInclination);

    function handleOrientation() {
        setOrientation(!orientation)
    }
    function handleInclination() {
        setInclination(!inclination)
    }

    const handleInputChange = event => {
        setData({ ...data, [event.target.name]: event.target.checked });
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        event.persist()
        if (data.panelTrackingOrientation === null || data.panelTrackingOrientation === undefined) {
            data.panelTrackingOrientation = false
        }
        if (data.panelTrackingInclination === null || data.panelTrackingInclination === undefined) {
            data.panelTrackingInclination = false
        }
        if (data.panelTrackingInclination === true) {
            data.inclination = 0
        }
        if (data.panelTrackingOrientation === true) {
            data.orientation = 0
        }
        setData({ ...data, isSubmitting: true, errorMessage: null });
        localStorage.setItem('currentPanelState', JSON.stringify(data))
        activateRedirection()
    }

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    function clearPanel() {
        localStorage.removeItem("currentPanelState")
        localStorage.removeItem("currentPanelId")
    }

    return (
        <Row>
            <Card id="card-panel-register-inside">
                <Form onSubmit={handleFormSubmit}>
                    <Row>
                        <Col xs={2} sm={2} md={2} lg={2} xl={2}>

                        </Col>
                        <Col xs={20} sm={20} md={20} lg={20} xl={20}>
                            <div id="pagination">
                                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                                <img src={bulletPle} width="2%" id="pagination-bullet" />
                                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            </div>
                        </Col>
                        <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2}>

                            <Link to="/my-installations">
                                <Button id="forms-close-button" onClick={clearPanel}>
                                    <Icon type="close" id="icon-x" />
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                            <h2 id="tittle-panel-registration">Panel tracking</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                            <p id="text-panel-registration">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        </Col>

                    </Row>
                    <Row>
                        <Col xs={7} sm={7} md={7} lg={7} xl={7}>
                        </Col>
                        <Col id="register-panel-fields-third" xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Form.Item>
                                <Checkbox
                                    label='Orientation'
                                    id="panel-tracking-orientation"
                                    name="panelTrackingOrientation"
                                    onClick={handleOrientation}
                                    onChange={handleInputChange}
                                    defaultChecked={currentPanelOrientation}
                                    checked={orientation}
                                >
                                    Orientation
                                    </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col id="register-panel-fields-third" xs={3} sm={3} md={3} lg={3} xl={3}>
                        </Col>
                        <Col id="register-panel-fields-third" xs={4} sm={4} md={4} lg={4} xl={4}>
                            <Form.Item>
                                <Checkbox label='Inclination'

                                    id="panel-tracking-inclination"
                                    name="panelTrackingInclination"
                                    onClick={handleInclination}
                                    onChange={handleInputChange}
                                    defaultChecked={currentPanelInclination}
                                    checked={inclination}
                                >
                                    Inclination
                                    </Checkbox>
                            </Form.Item>
                        </Col>
                        <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                        </Col>
                    </Row>
                    <Row>
                        <Col id="col-image-panel-tracking" xs={24} sm={24} md={24} lg={24} xl={24}>
                            <div>
                                <img src={panelTracking} id="image-panel-tracking" />
                            </div>
                        </Col>
                    </Row>
                    <Divider className="transparentDivider"></Divider>
                    <Row>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Link to="/second">
                                <Button id="button-panel-register-previous-third">PREVIOUS</Button>
                            </Link>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Button id="button-panel-register-next-third" type="submit" onClick={handleFormSubmit}>
                                NEXT
                                {toLocation ? <Redirect from="/third" to={(orientation && inclination) ? ("/sixth")
                                    : (orientation ? ("/fifth") : ("/fourth") || (inclination ? ("/fifth") : ("/fourth")))
                                }

                                /> : null}
                            </Button>

                        </Col>
                    </Row>
                </Form>
            </Card>
        </Row >
    )

}

export default ThirdForm