import React, { useState, useContext, useReducer, useRef, useEffect } from "react"
import { Button, Row, Col, Divider, Form, Input, InputNumber, Icon, Card, Radio, DatePicker } from 'antd'
import { Redirect } from "react-router-dom";
import noImage from '../../assets/no-image.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './firstForm.css'

const FirstForm = () => {

  const initialPanelState = {
    electrical_capacity: 0,
    surface: 0,
    lat: "",
    lon: "",
    orientation: "",
    inclination: "",
    panelTrackingOrientation: false,
    panelTrackingInclination: false,
    technologyUsed: "",
    inverterCapacity: 0,
    commissioningDate: "",
    observation: "",
    battery: true,
    batteryDescription: "",
    installationName: "",
    installationProperty: "",
    multimedia: []
  };
  // const [electrical_capacity, setElectrical_capacity] = useState()
  //GET INITIAL STATE
  var electrical_capacity
  var surface, commissioningDate, inverterCapacity, technologyUsed

  useEffect(() => {
    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"))
    if (currentPanelState) {
      electrical_capacity = currentPanelState.electrical_capacity
      // console.log("El ref", default_electrical_capacity)
      surface = currentPanelState.surface
      commissioningDate = currentPanelState.commissioningDate
      inverterCapacity = currentPanelState.inverterCapacity
      technologyUsed = currentPanelState.technologyUsed
    }

  }, []);


  // var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"))
  // if (currentPanelState) {
  //   default_electrical_capacity.current = currentPanelState.electrical_capacity
  //   surface = currentPanelState.surface
  //   commissioningDate = currentPanelState.commissioningDate
  //   inverterCapacity = currentPanelState.inverterCapacity
  //   technologyUsed = currentPanelState.technologyUsed
  // }

  function resetInput(event) {
    event.target.value = ""
  }

  function fillInput(event) {
    if (event.target.value === "")
      event.target.value = event.target.defaultValue
  }

  const [data, setData] = useState(initialPanelState);

  //DatePicker
  function onChangeDatePicker(date, dateString) {
    setData({ ...data, commissioningDate: dateString });
  }

  //RadioGroup
  const [radioValue, setRadioValue] = useState();
  const onChangeRadio = e => {
    setRadioValue({
      value: e.target.value,
    });
    setData({ ...data, technologyUsed: e.target.value })
  }

  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: (event.target.value) });
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
      <Col span={24} xs={0} sm={0} md={0} lg={24} xl={24}>
        <div id="background-panel-register"></div >
      </Col>
      <Card id="card-panel-register-inside">
        <Col span={24} id="" xs={24} sm={24} md={24} lg={24} xl={24}>
          <div id="pagination">
            <img src={bulletPle} width="2%" id="pagination-bullet" />
            <img src={bulletBuit} width="2%" id="pagination-bullet" />
            <img src={bulletBuit} width="2%" id="pagination-bullet" />
            <img src={bulletBuit} width="2%" id="pagination-bullet" />
            <img src={bulletBuit} width="2%" id="pagination-bullet" />
            <img src={bulletBuit} width="2%" id="pagination-bullet" />
          </div>
        </Col>
        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
          <h2 id="tittle-panel-registration">Register your solar installation</h2>
        </Col>
        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
          <p id="text-panel-registration">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
        </Col>
        <Form onSubmit={handleFormSubmit}>
          <Col id="col-register-panel-fields" span={8} xs={12} sm={8} md={8} lg={8} xl={8}>
            <Form.Item>
              <label id="panel-input-label">Electrical capacity</label>
              <Divider id="input-separator" />
              <Input type="number"
                // defaultValue={default_electrical_capacity}
                values={electrical_capacity}
                onChange={handleInputChange}
                onClick={resetInput}
                placeholder="330Kw"
                id="electrical_capacity"
                name="electrical_capacity"
              // required="true"
              />
            </Form.Item>
          </Col>
          <Col id="col-register-panel-fields" span={8} xs={12} sm={8} md={8} lg={8} xl={8}>
            <Form.Item>
              <label id="panel-input-label">Surface</label>
              <Divider id="input-separator" />
              <Input type="number"
                min={1} max={10000}
                defaultValue={surface}
                values={surface}
                onChange={handleInputChange}
                onClick={resetInput}
                placeholder="10m²"
                id="surface"
                name="surface"
                required />
            </Form.Item>
          </Col>
          <Col id="col-commissioning-date" span={8} xs={24} sm={8} md={8} lg={8} xl={8}>
            <Form.Item>
              <label id="panel-date-label">Comissioning date</label>
              <Divider id="input-date-separator" />
              <DatePicker
                onChange={onChangeDatePicker}
                id="commissioningDate"
                name="commissioningDate"
                required />
            </Form.Item>

          </Col>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3 id="subtittle-panel-registration">Panel type</h3>
          </Col>

          <Radio.Group
            defaultValue={technologyUsed}
            id="technology-used"
            name="technologyUsed"
            onChange={onChangeRadio}
            value={radioValue}
          >
            <Col id="col-radio-button" span={8} xs={8} sm={8} md={8} lg={8} xl={8}>
              <img src={noImage} id="images-tech-us" />
              <br />
              <label id="label-radio-button">Monocrystalline</label>
              <br />
              <Radio value={"Monocrystalline"} id="radio-button" />
            </Col>
            <Col id="col-radio-button" span={8} xs={8} sm={8} md={8} lg={8} xl={8}>
              <img src={noImage} id="images-tech-us" />
              <br />
              <label id="label-radio-button">Polycrystalline</label>
              <br />
              <Radio value={"Polycrystalline"} id="radio-button" />
            </Col>
            <Col id="col-radio-button" span={8} xs={8} sm={8} md={8} lg={8} xl={8}>
              <img src={noImage} id="images-tech-us" />
              <br />
              <label id="label-radio-button">Thin-film</label>
              <br />
              <Radio value={"Thin-film"} id="radio-button" />
            </Col>
          </Radio.Group>

          <Col id="register-panel-inverter" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <Form.Item>
              <label id="panel-alone-input-label">AC Inverter capacity</label>
              {/* <Divider id="input-separator" /> */}
              <Input type="number"
                placeholder="800Kw" name="inverterCapacity" id="inverter-capacity"
                defaultValue={inverterCapacity}
                values={inverterCapacity}
                onChange={handleInputChange}
                onClick={resetInput}
                required />
            </Form.Item>
          </Col>

          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            {/* <div id="error-message">
              {errorMessage ? (<p >{errorMessage}</p>) : (null)}
            </div> */}
            <div id="register-panels-button-container-first">
              <Button
                id="button-panel-register-next-first"
                onClick={handleFormSubmit}
              >
                NEXT
                {toLocation ? <Redirect from="/first" to="/second" /> : null}
              </Button>
            </div>
          </Col>
        </Form>
      </Card>
    </Row >
  )
}

export default FirstForm