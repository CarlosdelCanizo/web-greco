import React, { useState } from "react";
import { Form, Card, Row, Col, Icon, Button, Select, Divider, Input, Switch } from 'antd';
import { Link, Redirect } from "react-router-dom";
import inclinationImage from '../../assets/inclination.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './fourthForm.css'

const FifthForm = props => {

    //MOBILE GYRO*********************************************************
    //MOBILE VERSION
    var prova = window.parent.postMessage('getGyroscope', '*');
    console.log("El giroscope", prova)
    const [degree, setDegree] = useState()
    //MOBILE GYRO********************************************************

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    if (currentPanelState != null) {
        var inclination = currentPanelState.inclination
    }
    const [data, setData] = useState(currentPanelState);
    const [isChecked, setChecked] = useState(true);
    const { Option } = Select;

    function onChangeSwitch() {
        setChecked(!isChecked)
    }

    const handleInputSelectChange = value => {
        setData({ ...data, inclination: value });
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

    return (
        <Row>
            <div id="background-panel-register">

                <Card id="card-panel-register-inside">
                    <Col span={24} id="" xs={24} sm={24} md={24} lg={24} xl={24}>
                        <div id="pagination">
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                            <img src={bulletPle} width="2%" id="pagination-bullet" />
                            <img src={bulletBuit} width="2%" id="pagination-bullet" />
                        </div>
                    </Col>

                    <Link to="/private-mapping">
                        <Button id="forms-close-button">
                            <Icon type="close" id="icon-x" />
                        </Button>
                    </Link>

                    <div id="gyro_response" />
                    <input id="degreeFromMobile" name="degreeFromMobile"
                        onClick={event => setDegree(JSON.parse(event.target.value))}
                    >
                    </input>
                    <div>
                        <p>{degree}</p>
                    </div>

                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2 id="tittle-panel-registration">Panel inclination</h2>
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
                                            <label id="label-panel-orientation">Degrees</label>
                                            <Input type="number"
                                                min={1} max={45}
                                                value={data.inclination || inclination}
                                                // values={degree} PER AL MOVIL
                                                onChange={handleInputChange}
                                                placeholder="30.9 °"
                                                id="orientation"
                                                name="inclination"
                                                onClick={resetInput}
                                                required />
                                        </Form.Item>
                                    </Col>
                                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <img src={inclinationImage} id="register-panel-image-fifth" />
                                    </Col>
                                    <p id="text-panel-registration">
                                        Definition 0° North
                                </p>
                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Link to="fourth">
                                            <Button id="button-panel-register-previous-fifth">PREVIOUS</Button>
                                        </Link>
                                    </Col>
                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Button id="button-panel-register-next-fifth" type="submit" onClick={handleFormSubmit}>
                                            NEXT {toLocation ? <Redirect from="/fifth" to="/sixth" /> : null}
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
                                                style={{ width: 200 }}
                                                id="select-orientation"
                                                name="inclination"
                                                onChange={handleInputSelectChange}>
                                                <Option value="0">from 0° to 15°</Option>
                                                <Option value="15">from 15° to 30°</Option>
                                                <Option value="30">from 30° to 45°</Option>
                                                <Option value="45">from 45° to 60°</Option>
                                                <Option value="60">from 60° to 75°</Option>
                                                <Option value="75">from 75° to 90°</Option>
                                            </Select>
                                        </div>
                                    </Col>

                                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                                        <img src={inclinationImage} id="register-panel-image-fifth" />
                                    </Col>

                                    <p id="text-panel-registration">
                                        Definition 0° North
                                    </p>

                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                                        <Link to="fourth">
                                            <Button id="button-panel-register-previous-fifth">PREVIOUS</Button>
                                        </Link>
                                    </Col>
                                    <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>

                                        <Button id="button-panel-register-next-fifth" type="submit" onClick={handleFormSubmit}>
                                            NEXT {toLocation ? <Redirect from="/fifth" to="/sixth" /> : null}
                                        </Button>

                                    </Col>
                                </Form>
                            </React.Fragment>

                        )
                    }
                </Card>
            </div >
        </Row >
    )
}

export default FifthForm