import React, { useState, useEffect } from "react"
import { Button, Row, Col, Form, Input, Icon, Card, Radio, DatePicker, Select, message, Popover } from 'antd'
import { Redirect, Link } from "react-router-dom";
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import monocrystalline from '../../assets/monocrystalline.jpg'
import multicrystalline from '../../assets/multicrystalline.jpg'
import thinFilm from '../../assets/thin_film.jpg'
import './firstForm.css'
import moment from 'moment'

const FirstForm = (props) => {

  console.log("first props", props)
  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/first")

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

  var currentPanelId = JSON.parse(localStorage.getItem("currentPanelId"));

  //*ADD/REMOVE BACKGROUND*
  useEffect(() => {
    if (window.innerWidth < 768 && window.innerHeight > 720) {
      document.body.classList.remove('body_forms');
    } else {
      document.body.classList.add('body_forms');
    }
  }, []);


  //GET UPDATE DATA
  if (myPanel !== undefined) {
    var electrical_capacity = myPanel.panel.electrical_capacity
    var surface = myPanel.panel.surface
    //OPTIONALS FIELDS
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
    //OPTIONALS FIELDS
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
      //OPTIONALS FIELDS
      if (commissioningDate !== undefined) {
        var commissioningDate = (currentPanelState.commissioningDate).substring(0, 10)
      }
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
      //OPTIONALS FIELDS
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
      error()
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

  const error = () => {
    message.error('Only numbers, please', 5);
  };

  const isEnabled =
    (currentPanelId && currentPanelId > 0) ||
    (data.electrical_capacity.length > 0 || electrical_capacity && electrical_capacity !== undefined && electrical_capacity.length > 0) &&
    // (data.surface.length > 0 || surface && surface !== undefined && surface.length > 0) &&
    //(data.commissioningDate !== "" || commissioningDate !== undefined) &&
    //(data.technologyUsed !== "" || technologyUsed && technologyUsed !== undefined && technologyUsed.length > 0) &&
    //(data.inverterCapacity.length > 0 || inverterCapacity && inverterCapacity.length > 0) &&
    (data.installationType !== "" || installationType && installationType !== undefined && installationType.length > 0);

  const infoMonocrystalline = (
    <div>
      <p>
        Composed of a number of dark blue or black cells connected by thin silvered tabs, each of them looks fairly uniform and typically has beveled edges. It has a front glass, a back plastic sheet and an aluminium frame.
      </p>
    </div>
  );

  const infoPolycrystalline = (
    <div>
      <p>
        Unlike monocrystalline solar cells, polycrystalline (also called multicrystalline) cells are completely squared, without beveled edges, and tend to have a less uniform, clearer blue color. It also has a front glass, a back plastic sheet and an aluminium frame.
      </p>
    </div>
  );

  const infoThinFilm = (
    <div>
      <p>
        In a thin-film panel the solar cells come as stripes all along the module, sandwiched between two glasses. However, it is a bit difficult to distinguish the isolated cells, and the panel shows a rather uniform dark appearance.
      </p>
    </div >
  );

  return (
    <Row>
      <Card id="card-panel-register-inside">
        <Form onSubmit={handleFormSubmit}>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          </Col>
          <Col xs={20} sm={20} md={20} lg={20} xl={20}>
            <div id="pagination">
              <img src={bulletPle} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
            </div>
          </Col>
          <Col xs={2} sm={2} md={2} lg={2} xl={2}>
            <Link to="my-installations-sider">
              <Button id="forms-close-button" onClick={clearPanel}>
                <Icon type="close" id="icon-x" />
              </Button>
            </Link>
          </Col>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h2 id="tittle-panel-registration">Upload a solar power system</h2>
            </Col>
          </Row>
          <Row>
            <Col id="col-register-panel-fields" xs={12} sm={12} md={8} lg={8} xl={8}>
              <Form.Item
              >
                <div id="div-electrical-background">
                  <label id="panel-input-label-electrical_capacity">Installed capacity</label>
                  <Input
                    id="electrical_capacity"
                    name="electrical_capacity"
                    value={data.electrical_capacity === 0 ? (electrical_capacity) : (data.electrical_capacity)}
                    onChange={handleInputChange}
                    onClick={resetInput}
                    placeholder="330kW"
                    required
                  />
                </div>
              </Form.Item>
            </Col>
            <Col id="col-register-panel-fields" xs={12} sm={12} md={8} lg={8} xl={8}>
              <Form.Item>
                <div id="div-surface-background">
                  <label id="panel-input-label-surface">Area</label>
                  <Input
                    value={data.surface === 0 ? surface : data.surface}
                    onChange={handleInputChange}
                    onClick={resetInput}
                    placeholder="10m²"
                    id="surface"
                    name="surface"
                  />
                </div>
              </Form.Item>
            </Col>
            <Col id="col-commissioning-date" xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item>
                <div id="div-date-background">
                  <label id="panel-input-label-commissioningDate">Installation date</label>
                  <DatePicker
                    defaultValue={commissioningDate ? (moment(commissioningDate, 'YYYY-MM-DD')) : (null)}
                    onChange={onChangeDatePicker}
                    onClick={resetInput}
                    id="commissioningDate"
                    name="commissioningDate"
                  />
                </div>
              </Form.Item>

            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <div id="div-subtittle">
                <h3 id="subtittle-panel-registration">Solar panel type</h3>
              </div>
            </Col>
          </Row>
          <Row>
            <Radio.Group
              id="technology-used"
              name="technologyUsed"
              onChange={onChangeRadio}
              value={radioValue}
            >
              <Row>
                <Col id="image-col" xs={8} sm={8} md={8} lg={8} xl={8}>
                  <Row >
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                      <img src={monocrystalline} id="images-tech-us" />

                    </Col>
                  </Row>
                  <Row id="radio-label-row">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <label id="label-radio-button">Monocrystalline</label>
                      <Popover id="popover-left"
                        placement="topLeft"
                        content={infoMonocrystalline}
                        title={<p id="popover-title">Monocrystalline silicon</p>}
                        trigger={"click"}
                        arrowPointAtCenter>
                        &nbsp;
                        <Icon type="question-circle" theme="twoTone" />
                      </Popover>
                    </Col>
                  </Row>
                  <Row>
                    <Col id="radio-button-row" xs={24} sm={24} md={24} lg={24} xl={24}>

                      <Radio value="Monocrystalline silicon" id="radio-button" />

                    </Col>
                  </Row>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                  <Row>
                    <Col id="image-col" xs={24} sm={24} md={24} lg={24} xl={24}>

                      <img src={multicrystalline} id="images-tech-us" />

                    </Col>
                  </Row>
                  <Row id="radio-label-row">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                      <label id="label-radio-button">Polycrystalline</label>
                      <Popover id="popover-center"
                        placement="top"
                        content={infoPolycrystalline}
                        title={<p id="popover-title">Polycrystalline silicon</p>}
                        trigger={"click"}
                        arrowPointAtCenter>
                        &nbsp;
                        <Icon type="question-circle" theme="twoTone" />
                      </Popover>
                    </Col>
                  </Row>
                  <Row id="radio-button-row">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                      <Radio value="Polycrystalline silicon" id="radio-button" />

                    </Col>
                  </Row>
                </Col>

                <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                  <Row>
                    <Col id="image-col-large" xs={24} sm={24} md={24} lg={24} xl={24}>

                      <img src={thinFilm} id="images-tech-us-large" />

                    </Col>
                  </Row>
                  <Row id="radio-label-row">
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>

                      <label id="label-radio-button">Thin-film</label>
                      <Popover id="popover-right"
                        placement="topRight"
                        content={infoThinFilm}
                        title={<p id="popover-title">Thin-film</p>}
                        trigger={"click"}
                        arrowPointAtCenter>
                        &nbsp;
                        <Icon type="question-circle" theme="twoTone" />
                      </Popover>
                    </Col>
                  </Row>
                  <Row>
                    <Col id="radio-button-row" xs={24} sm={24} md={24} lg={24} xl={24}>

                      <Radio value="Thin-film " id="radio-button" />

                    </Col>
                  </Row>
                </Col>

              </Row>
            </Radio.Group>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-inverter-background">
                  <label id="panel-input-label-inverter">Inverter capacity</label>
                  <Input
                    placeholder="800kW"
                    name="inverterCapacity"
                    id="inverter-capacity"
                    value={data.inverterCapacity === 0 ? inverterCapacity : data.inverterCapacity}
                    onChange={handleInputChange}
                    onClick={resetInput}
                  />
                </div>
              </Form.Item>
            </Col>

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-installation-background-firstform">
                  <label id="panel-input-label-type">Installation type</label>
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
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Button
                //disabled={!isEnabled ? (validateFields()) : (false)}
                disabled={!isEnabled}
                id="button-panel-register-next-first"
                onClick={handleFormSubmit}
              >
                NEXT
                {toLocation ? <Redirect from="/first" to="/second" /> : null}
              </Button>

            </Col>
          </Row>
        </Form>
      </Card>
    </Row >
  )
}

export default FirstForm