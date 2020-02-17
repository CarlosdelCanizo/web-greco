import React, { useState } from "react"
import { Button, Row, Col, Form, Input, Icon, Card, Radio, DatePicker, Select, Alert } from 'antd'
import { Redirect, Link } from "react-router-dom";
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import monocrystalline from '../../assets/monocrystalline.jpg'
import multicrystalline from '../../assets/multicrystalline.jpg'
import thinFilm from '../../assets/thin_film.jpg'
import './firstForm.css'
import moment from 'moment'

const FirstForm = (props) => {

  const initialPanelState = {
    electrical_capacity: 0,
    surface: 0,
    lat: "",
    lon: "",
    orientation: 0,
    inclination: 0,
    panelTrackingOrientation: null,
    panelTrackingInclination: null,
    technologyUsed: "",
    inverterCapacity: 0,
    commissioningDate: "",
    observation: "",
    battery: null,
    batteryDescription: "",
    installationName: "",
    installationProperty: "",
    installationType: "",
    multimedia: [],
  };

  const [data, setData] = useState(initialPanelState);
  const { Option } = Select;
  const myPanel = props.location.myPanel

  var currentPanelId = JSON.parse(localStorage.getItem("currentPanelId"))

  //GET UPDATE DATA
  if (myPanel !== undefined) {
    var electrical_capacity = myPanel.panel.electrical_capacity
    var surface = myPanel.panel.surface
    var commissioningDate = moment(myPanel.panel.commissioningDate, 'YYYY-MM-DD')
    var technologyUsed = myPanel.panel.technologyUsed
    var inverterCapacity = myPanel.panel.inverterCapacity
    var installationType = myPanel.panel.installationType
    //OTHERS
    data.id = myPanel.panel.id
    data.lat = "" + myPanel.panel.lat
    data.lon = "" + myPanel.panel.lon
    data.inclination = myPanel.panel.inclination
    data.orientation = myPanel.panel.orientation
    data.panelTrackingOrientation = myPanel.panel.panelTrackingOrientation
    data.panelTrackingInclination = myPanel.panel.panelTrackingInclination
    data.observation = myPanel.panel.observation
    data.battery = myPanel.panel.battery
    data.batteryDescription = myPanel.panel.batteryDescription
    data.installationName = myPanel.panel.installationName
    data.installationProperty = myPanel.panel.installationProperty
  } else {
    // GET FIRST INPUT DATA
    var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"))
    if (currentPanelState !== null) {
      var electrical_capacity = currentPanelState.electrical_capacity
      var surface = currentPanelState.surface
      var commissioningDate = (currentPanelState.commissioningDate).substring(0, 10)
      var technologyUsed = currentPanelState.technologyUsed
      var inverterCapacity = currentPanelState.inverterCapacity
      var installationType = currentPanelState.installationType
      //OTHERS
      var lat = currentPanelState.lat
      var lon = currentPanelState.lon
      var inclination = currentPanelState.inclination
      var orientation = currentPanelState.orientation
      var panelTrackingOrientation = currentPanelState.panelTrackingOrientation
      var panelTrackingInclination = currentPanelState.panelTrackingInclination
      var observation = currentPanelState.observation
      var battery = currentPanelState.battery
      var batteryDescription = currentPanelState.batteryDescription
      var installationName = currentPanelState.installationName
      var installationProperty = currentPanelState.installationProperty
    }
  }

  //DATE PICKER
  function onChangeDatePicker(date, dateString) {
    setData({ ...data, commissioningDate: dateString });
  }

  //RADIO GROUP
  const [radioValue, setRadioValue] = useState(technologyUsed);
  const onChangeRadio = event => {
    let value = event.target.value
    setRadioValue(value);
    setData({ ...data, technologyUsed: value })
  }

  //SELECT
  const handleInputSelectChange = value => {
    setData({ ...data, installationType: value });
  };

  //INPUTS HANDLER CHANGE
  const handleInputChange = event => {
    if (isNaN(event.target.value)) {
      setData({ ...data, errorMessage: "Enter only numbers, please" });
    } else {
      setData({ ...data, [event.target.name]: (event.target.value), errorMessage: null });
    }
  };

  //handleSubmit
  const handleFormSubmit = event => {
    event.preventDefault()
    event.persist()
    if (data.electrical_capacity === 0 && electrical_capacity !== 0) {
      data.electrical_capacity = electrical_capacity
    }
    if (data.surface === 0 && surface !== 0) {
      data.surface = surface
    }
    if (data.commissioningDate === "" || commissioningDate === "") {
      data.commissioningDate = commissioningDate
    }
    if (data.technologyUsed === "" && technologyUsed !== "") {
      data.technologyUsed = technologyUsed
    }
    if (data.inverterCapacity === 0 && inverterCapacity !== 0) {
      data.inverterCapacity = inverterCapacity
    }
    if (data.installationType === "" && installationType !== "") {
      data.installationType = installationType
    }
    //OTHERS
    if (data.lat === "" && lat !== "") {
      data.lat = lat
    }
    if (data.lon === "" && lon !== "") {
      data.lon = lon
    }
    if (data.inclination === 0 && inclination !== 0) {
      data.inclination = inclination
    }
    if (data.orientation === 0 && inclination !== 0) {
      data.orientation = orientation
    }
    if (data.panelTrackingOrientation === null && panelTrackingOrientation !== null) {
      data.panelTrackingOrientation = panelTrackingOrientation
    }
    if (data.panelTrackingInclination === null && panelTrackingInclination !== null) {
      data.panelTrackingInclination = panelTrackingInclination
    }
    if (data.observation === "" && observation !== "") {
      data.observation = observation
    }
    if (data.battery === null && battery !== null) {
      data.battery = battery
    }
    if (data.batteryDescription === "" && batteryDescription !== "") {
      data.batteryDescription = batteryDescription
    }
    if (data.installationName === "" && installationName !== "") {
      data.installationName = installationName
    }
    if (data.installationProperty === "" && installationProperty !== "") {
      data.installationProperty = installationProperty
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

  function resetInput(event) {
    event.target.value = ""
  }

  function clearPanel() {
    localStorage.removeItem("currentPanelState")
    localStorage.removeItem("currentPanelId")
  }

  const isEnabled =
    (currentPanelId && currentPanelId > 0) ||
    (data.electrical_capacity.length > 0 || electrical_capacity && electrical_capacity !== undefined && electrical_capacity.length > 0) &&
    (data.surface.length > 0 || surface && surface !== undefined && surface.length > 0) &&
    (data.commissioningDate !== "" || commissioningDate !== undefined) &&
    (data.technologyUsed !== "" || technologyUsed && technologyUsed !== undefined && technologyUsed.length > 0) &&
    (data.inverterCapacity.length > 0 || inverterCapacity && inverterCapacity.length > 0) &&
    (data.installationType !== "" || installationType && installationType !== undefined && installationType.length > 0)

  return (
    <Row>
      <div id="background-panel-register">
        <Card id="card-panel-register-inside">
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <div id="pagination">
              <img src={bulletPle} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
            </div>
          </Col>

          <Link to="/private-mapping">
            <Button id="forms-close-button" onClick={clearPanel}>
              <Icon type="close" id="icon-x" />
            </Button>
          </Link>

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
              <Form.Item
              >
                <div id="div-electrical-background">
                  <label id="panel-input-label">Electrical capacity</label>
                  <Input
                    id="electrical_capacity"
                    name="electrical_capacity"
                    value={data.electrical_capacity === 0 ? (electrical_capacity) : (data.electrical_capacity)}
                    onChange={handleInputChange}
                    onClick={resetInput}
                    placeholder="330Kw"

                  />
                </div>
              </Form.Item>
            </Col>
            <Col id="col-register-panel-fields" span={8} xs={12} sm={8} md={8} lg={8} xl={8}>
              <Form.Item>
                <div id="div-surface-background">
                  <label id="panel-input-label">Surface</label>
                  <Input
                    value={data.surface === 0 ? surface : data.surface}
                    onChange={handleInputChange}
                    onClick={resetInput}
                    placeholder="10m²"
                    id="surface"
                    name="surface"
                    required />
                </div>
              </Form.Item>
            </Col>
            <Col id="col-commissioning-date" span={8} xs={24} sm={8} md={8} lg={8} xl={8}>
              <Form.Item>
                <div id="div-date-background">
                  <label id="panel-input-label">Comissioning date</label>
                  <DatePicker
                    defaultValue={commissioningDate ? (moment(commissioningDate, 'YYYY-MM-DD')) : (null)}
                    onChange={onChangeDatePicker}
                    onClick={resetInput}
                    id="commissioningDate"
                    name="commissioningDate"
                    required />
                </div>
              </Form.Item>

            </Col>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <div id="div-subtittle">
                <h3 id="subtittle-panel-registration">Panel type</h3>
              </div>
            </Col>

            <Radio.Group
              id="technology-used"
              name="technologyUsed"
              onChange={onChangeRadio}
              value={radioValue}
              required
            >

              <Col id="col-radio-button" span={8} xs={8} sm={8} md={8} lg={8} xl={8}>
                <img src={monocrystalline} id="images-tech-us" />
                <br />
                <label id="label-radio-button">Monocrystalline silicon</label>
                <br />
                <Radio value="Monocrystalline silicon" id="radio-button" />
              </Col>
              <Col id="col-radio-button" span={8} xs={8} sm={8} md={8} lg={8} xl={8}>
                <img src={multicrystalline} id="images-tech-us" />
                <br />
                <label id="label-radio-button">Polycrystalline silicon</label>
                <br />
                <Radio value="Polycrystalline silicon" id="radio-button" />
              </Col>
              <Col id="col-radio-button" span={8} xs={8} sm={8} md={8} lg={8} xl={8}>
                <img src={thinFilm} id="images-tech-us-large" />
                <br />
                <label id="label-radio-button">Thin-film</label>
                <br />
                <Radio value="Thin-film " id="radio-button" />
              </Col>
            </Radio.Group>

            <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-inverter-background">
                  <label id="panel-input-label">AC Inverter capacity</label>
                  <Input
                    placeholder="800Kw"
                    name="inverterCapacity"
                    id="inverter-capacity"
                    value={data.inverterCapacity === 0 ? inverterCapacity : data.inverterCapacity}
                    onChange={handleInputChange}
                    onClick={resetInput}
                    required />
                </div>
              </Form.Item>

            </Col>
            <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-installation-background">
                  <label id="panel-input-label">Installation type</label>
                  <Select
                    placeholder='On-grid'
                    name="installationType"
                    id="installation-type"
                    value={data.installationType === "" ? installationType : data.installationType}
                    onChange={handleInputSelectChange}
                    onClick={resetInput}
                    required
                  >

                    <Option id="select-property" value="On-grid">On-grid</Option>
                    <Option id="select-property" value="Of-grid">Off-grid</Option>

                  </Select>
                </div>
              </Form.Item>
            </Col>
            <div >
              {(data.errorMessage) ? (<p id="error-message">{data.errorMessage}</p>) : (null)}
            </div>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>

              <Button
                disabled={!isEnabled}
                id="button-panel-register-next-first"
                onClick={handleFormSubmit}
              >
                NEXT
                {toLocation ? <Redirect from="/first" to="/second" /> : null}
              </Button>

            </Col>
          </Form>
        </Card>
      </div >
    </Row >
  )
}

export default FirstForm