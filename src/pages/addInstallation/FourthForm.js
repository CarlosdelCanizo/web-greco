import React, { useState } from "react";
import { Form, Card, Icon, Button, Col, Row, Select, Input, Switch } from 'antd';
import { Link, Redirect } from "react-router-dom";
import compass from '../../assets/compass.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './fourthForm.css'

const FourthForm = props => {

    //MOBILE GYRO*********************************************************
    //MOBILE VERSION
    const [degree, setDegree] = useState()
    window.parent.postMessage('getGyroscope', '*');

    // var isMobile = localStorage.getItem("isMobile")
    // console.log("isMobile", isMobile)

    //MOBILE GYRO********************************************************

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    var orientation
    if (currentPanelState !== null) {
        orientation = currentPanelState.orientation
    }
    const [data, setData] = useState(currentPanelState);
    const [isChecked, setChecked] = useState(true);
    const { Option } = Select;


    function onChangeSwitch() {
        setChecked(!isChecked)
    }


    const handleInputSelectChange = value => {
        setData({ ...data, orientation: value });
    };

    const handleInputChange = event => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        event.persist()
        setData({ ...data, isSubmitting: true, errorMessage: null });
        localStorage.setItem('currentPanelState', JSON.stringify(data))
        activateRedirection()
    }

    //Redirect
    const [toLocation, setLocation] = useState(false);
    function activateRedirection() {
        setLocation(true)
    }

    function resetInput(event) {
        event.target.value = ""
    }

    let isMobile = false;

    return (
        <Row>
            <div id="background-panel-register">

                <Card id="card-panel-register-inside">
                    <Col span={24} id="" xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="pagination">
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletPle} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                        </div>
                    </Col>

                    <Link to="/private-mapping">
                        <Button id="forms-close-button">
                            <Icon type="close" id="icon-x" />
                        </Button>
                    </Link>

                    <div id="gyro_response" />
                    <input id="orientationFromMobile_alpha" name="orientationFromMobile_alpha"
                        onClick={event => {
                            setDegree(JSON.parse(event.target.value));
                            console.log("els degrees", degree);
                            if (document.getElementById("greco_iframe") != undefined) {
                                isMobile = true;
                                console.log("isMobile", isMobile);
                            }
                            else {
                                console.log("no isMobile");
                            }


                        }}
                    >
                        {/* </input>
                    <input id="orientationFromMobile_beta" name="orientationFromMobile_beta"
                        onClick={event => setDegree(JSON.parse(event.target.value))}
                    >
                    </input>
                    <input id="orientationFromMobile_gamma" name="orientationFromMobile_gamma"
                        onClick={event => setDegree(JSON.parse(event.target.value))}
                    > */}
                    </input>
                    <div>
                        <p>{degree} </p>
                        <p>guacamayo</p>
                        {isMobile ? (<p>SI</p>) : (<p>NO</p>)}
                    </div>

                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2 id="tittle-panel-registration">Panel orientation</h2>
                    </Col>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <p id="text-panel-registration">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </Col>
                    <Switch
                        onChange={onChangeSwitch}
                        name="selector"
                        id="selector"
                    />
                    {isChecked ?
                        (
                            <React.Fragment>
                                <Form onSubmit={handleFormSubmit}>
                                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <Form.Item>
                                            <label id="label-panel-orientation">Input degrees</label>
                                            <Input type="number"
                                                onClick={resetInput}
                                                min={1} max={360}
                                                value={data.orientation || orientation}
                                                // value={degree} //ARREGLAR PER AL MOVIL
                                                onChange={handleInputChange}
                                                placeholder="30.9°"
                                                id="orientation"
                                                name="orientation"
                                                required
                                            />

                                        </Form.Item>
                                    </Col>
                                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <img src={compass} id="register-panel-image-fourth" />
                                    </Col>
                                    <p id="text-panel-registration">
                                        Definition 0° North
                                        </p>
                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Link to="/third">
                                            <Button id="button-panel-register-previous-fourth">PREVIOUS</Button>
                                        </Link>
                                    </Col>
                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Button id="button-panel-register-next-fourth" type="submit" onClick={handleFormSubmit}>
                                            NEXT
                                        {toLocation ? <Redirect from="/fourth" to="/fifth" /> : null}
                                        </Button>
                                    </Col>
                                </Form>
                            </React.Fragment>
                        )
                        :
                        (
                            <React.Fragment>

                                <Form onSubmit={handleFormSubmit}>
                                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <div id="register-panel-fields-fourth">
                                            <label id="label-panel-orientation-select">Select degrees</label>
                                            <Select
                                                id="select-orientation"
                                                style={{ width: 200 }}
                                                name="orientation"
                                                onChange={handleInputSelectChange}>

                                                <Option value="0">NE (from 0° to 45°)</Option>
                                                <Option value="45">EN (from 45° to 90°)</Option>

                                                <Option value="90">ES (from 90° to 135°)</Option>
                                                <Option value="135">SE (from 135° to 180°)</Option>


                                                <Option value="180">SW (from 180° to 225°)</Option>
                                                <Option value="225">WS (from 225° to 270°)</Option>

                                                <Option value="270">WN (from 270° to 315°)</Option>
                                                <Option value="315">NW (from 315° to 360°)</Option>

                                            </Select>
                                        </div>
                                    </Col>

                                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <img src={compass} id="register-panel-image-fourth" />
                                    </Col>

                                    <p id="text-panel-registration">
                                        Definition 0° North
                                    </p>

                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Link to="/third">
                                            <Button id="button-panel-register-previous-fourth">PREVIOUS</Button>
                                        </Link>
                                    </Col>
                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Button id="button-panel-register-next-fourth" type="submit" onClick={handleFormSubmit}>
                                            NEXT
                                            {toLocation ? <Redirect from="/fourth" to="/fifth" /> : null}
                                        </Button>
                                    </Col>
                                </Form>
                            </React.Fragment>
                        )}
                </Card>
            </div>
        </Row >
    )
}

export default FourthForm