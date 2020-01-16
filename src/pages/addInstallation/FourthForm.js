import React, { useState } from "react";
import { Form, Card, Icon, Button, Col, Row, Select, Divider, Input } from 'antd';
import { Link, Redirect } from "react-router-dom";
import compass from '../../assets/compass.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './fourthForm.css'

const FourthForm = (props) => {

    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
    const [data, setData] = useState(currentPanelState);
    const { Option } = Select;

    // const handleInputChange = value => {
    //     setData({ ...data, orientation: value });
    // };

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
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <h2 id="tittle-panel-registration">Panel orientation</h2>
                    </Col>
                    <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                        <p id="text-panel-registration">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                    </Col>
                    <Form onSubmit={handleFormSubmit}>

                        {/* <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}> */}
                        {/* <div id="register-panel-fields-fourth">
                                <Select style={{ width: 200 }} name="orientation" onChange={handleInputChange}>

                                    <Option value={"NE (from 0° to 45°)"}>NE (from 0° to 45°)</Option>
                                    <Option value="EN (from 45° to 90°)">EN (from 45° to 90°)</Option>

                                    <Option value="ES (from 90° to 135°)">ES (from 90° to 135°)</Option>
                                    <Option value="SE (from 135° to 180°)">SE (from 135° to 180°)</Option>


                                    <Option value="SW (from 180° to 225°)">SW (from 180° to 225°)</Option>
                                    <Option value="WS (from 225° to 270°)">WS (from 225° to 270°)</Option>

                                    <Option value="WN (from 270° to 315°)">WN (from 270° to 315°)</Option>
                                    <Option value="NW (from 315° to 360°)">NW (from 315° to 360°)</Option>

                                </Select>
                            </div> */}


                        {/* <Col id="col-register-panel-fields" span={24} xs={24} sm={24} md={24} lg={24} xl={24}> */}
                        <Col id="col-register-panel-radio" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item>
                                {/* <label id="panel-input-label">Degrees</label> */}
                                <Divider id="input-separator" />
                                <Input type="number"
                                    min={1} max={10000}
                                    values={data.orientation} onChange={handleInputChange}
                                    placeholder="30.9 °" id="orientation" name="orientation"
                                    required />
                            </Form.Item>


                        </Col>
                        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                            <img src={compass} id="register-panel-image-fourth" />
                        </Col>

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
                </Card>
            </div>
        </Row >

    )
}

export default FourthForm