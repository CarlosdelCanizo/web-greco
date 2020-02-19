import React, { useState, useContext } from "react"
import { Form, Card, Radio, Button, Row, Col, message, Upload, Icon, Select, Input } from 'antd'
import { Link, Redirect } from "react-router-dom"
import axiosConfig from '../../api/axiosConfig'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './sixthForm.css'
import { ProfileContext } from '../../utils/profile/ProfileContext'

const SixthForm = props => {

  const profileContext = useContext(ProfileContext)
  var username = profileContext.username

  var installationName, installationProperty, battery, batteryDescription, observation

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
  var currentPanelId = JSON.parse(localStorage.getItem("currentPanelId"));
  var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));

  if (currentPanelState !== null) {
    installationName = currentPanelState.installationName
    installationProperty = currentPanelState.installationProperty
    battery = currentPanelState.battery
    batteryDescription = currentPanelState.batteryDescription
    observation = currentPanelState.observation
  }

  const [data, setData] = useState(currentPanelState);
  const { Option } = Select;
  var panelResponseId //IMAGES ON POST
  var currentPanelId //IMAGES ON PUT

  //RadioGroup
  const [radioValue, setRadioValue] = useState(battery);
  const onChangeRadio = event => {
    let value = event.target.value
    setRadioValue(value);
    setData({ ...data, battery: value })
  }

  const handlePreview = file => {
    setImages({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  const handleUploadImages = ({ fileList }) => {
    setImages({ fileList });
  };

  //Form handlers
  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  //Select Handlers
  const handleInputSelectChange = value => {
    setData({ ...data, installationProperty: value });
  };

  function resetInput(event) {
    event.target.value = ""
  }

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    if (data.installationName === "" && installationName !== "") {
      data.installationName = installationName
    }
    if (data.installationProperty === "" && installationProperty !== "") {
      data.installationProperty = installationProperty
    }
    if (data.battery === null && battery !== null) {
      data.battery = battery
    }
    if (data.batteryDescription === "" && batteryDescription !== "") {
      data.batteryDescription = batteryDescription
    }
    if (data.observation === "" && observation !== "") {
      data.observation = observation
    }
    if (currentPanelId === 0) {
      localStorage.setItem('currentPanelState', JSON.stringify(data))
      postPanel()
    }
    if (currentPanelId !== 0) {
      localStorage.setItem('currentPanelState', JSON.stringify(data))
      updatePanel()

    }
  }

  //CREATE NEW PANEL POST
  function postPanel() {
    var panelForSubmit = JSON.parse(localStorage.getItem('currentPanelState'))
    var body = {
      username: username,
      solarPanel: panelForSubmit
    }
    axiosConfig.post("/solarPanel", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        if (response.status === 200) {
          panelResponseId = response.data.solarPanel.id
          uploadImage()
          activateRedirection()
        }
      })
      .catch(function (error) {
        error()
      });
  }

  const error = () => {
    message.error('Server error. You can´t post/update your installation now. Please, try again later.', 5);
  };

  const errorImages = () => {
    message.error('Server error. You can´t upload images now. Please, try again later.', 5);
  };

  //UPDATE PANEL PUT
  function updatePanel() {
    var body = {
      id: data.id,
      electrical_capacity: data.electrical_capacity,
      surface: data.surface,
      lat: data.lat,
      lon: data.lon,
      orientation: data.orientation,
      inclination: data.inclination,
      panelTrackingOrientation: data.panelTrackingOrientation,
      panelTrackingInclination: data.panelTrackingInclination,
      technologyUsed: data.technologyUsed,
      inverterCapacity: data.inverterCapacity,
      commissioningDate: data.commissioningDate,
      observation: data.observation,
      battery: data.battery,
      batteryDescription: data.batteryDescription,
      installationName: data.installationName,
      installationProperty: data.installationProperty,
      installationType: data.installationType,
    }
    axiosConfig.put("/solarPanel", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        if (response.status === 200) {
          uploadImage()
          activateRedirection()
        }
      })
      .catch(function (error) {
        error()
      });
  }

  //UPLOAD IMAGES
  const [images, setImages] = useState(
    {
      previewVisible: true,
      previewImage: '',
      fileList: []
    }
  );
  function uploadImage() {
    if (panelResponseId === undefined) {
      panelResponseId = currentPanelId
    }
    const formData = new FormData()

    for (var i = 0; i < images.fileList.length; i++) {
      formData.append('file', images.fileList[i].originFileObj)
    }

    axiosConfig.post("/multimedia/upload/" + panelResponseId, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": access_token
        }
      })
      .then(response => {
        if (response.status === 200) {
          throw response
        }
      })
      .then(error => {
        errorImages()
      })
  }

  //REDIRECT
  const [toLocation, setLocation] = useState(false);
  function activateRedirection() {
    setLocation(true)
  }

  function clearPanel() {
    localStorage.removeItem("currentPanelState")
    localStorage.removeItem("currentPanelId")
  }

  const isEnabled =
    (data.installationName !== undefined && data.installationName.length > 0 || installationName && installationName !== undefined && installationName > 0) &&
    (data.installationProperty !== undefined && data.installationProperty.length > 0 || installationProperty && installationProperty !== undefined && installationProperty > 0) &&
    (data.battery !== undefined || battery && battery !== "" && battery !== undefined) &&
    (data.batteryDescription !== undefined && data.batteryDescription.length > 0 || batteryDescription && batteryDescription !== undefined && batteryDescription > 0) &&
    (data.observation !== undefined && data.observation.length > 0 || observation && observation > 0);

  return (
    <Row>
      <div id="background-panel-register">
        <Card id="card-panel-register-inside">
          <Form onSubmit={handleFormSubmit}>
            <Row>

              <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2}>

              </Col>
              <Col span={20} xs={20} sm={20} md={20} lg={20} xl={20}>
                <div id="pagination">
                  <img src={bulletBuit} width="2%" id="pagination-bullet" />
                  <img src={bulletBuit} width="2%" id="pagination-bullet" />
                  <img src={bulletBuit} width="2%" id="pagination-bullet" />
                  <img src={bulletBuit} width="2%" id="pagination-bullet" />
                  <img src={bulletBuit} width="2%" id="pagination-bullet" />
                  <img src={bulletPle} width="2%" id="pagination-bullet" />
                </div>
              </Col>

              <Col span={2} xs={2} sm={2} md={2} lg={2} xl={2}>
                <Link to="/private-mapping">
                  <Button id="forms-close-button" onClick={clearPanel}>
                    <Icon type="close" id="icon-x" />
                  </Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <h2 id="tittle-panel-registration">Additional information</h2>
              </Col>
            </Row>
            <Row>
              <Col id="register-panel-fields-sixth" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Item>
                  <div id="div-installation-background">
                    <label id="panel-sixth-label">Instalation name</label>
                    <Input
                      placeholder='My installation'
                      type="text"
                      name="installationName"
                      id="installation-name"
                      value={data.installationName === "" ? installationName : data.installationName}
                      onChange={handleInputChange}
                      onClick={resetInput}
                    />
                  </div>
                </Form.Item>
              </Col>
              <Col id="register-panel-fields-sixth" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Form.Item>
                  <div id="div-installation-background">
                    <label id="panel-sixth-label">Installation property</label>
                    <Select placeholder='Private'
                      name="installationProperty"
                      id="installation-property"
                      value={data.installationProperty || installationProperty}
                      onChange={handleInputSelectChange}
                    >

                      <Option id="select-property" value="Public">Public</Option>
                      <Option id="select-property" value="Private">Private</Option>

                    </Select>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <h2 id="subtittle-panel-registration-sixth">Installation photography</h2>

                <div id="upload-images">
                  <Upload
                    listType="picture"
                    fileList={images.fileList}
                    onPreview={handlePreview}
                    onChange={handleUploadImages}
                    beforeUpload={() => false}
                    name="multimedia"
                  >
                    <Button>
                      <p id="upload-text-one">+ Upload images</p>
                    </Button>
                    <p>Maximum 3 images per installation</p>
                    <p>Only png or jpg, with max size of 5 MB each one</p>
                  </Upload>
                </div>
              </Col>
            </Row>
            <Row>
              <Col id="col-battery" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <h3 id="subtittle-panel-registration-battery"> Do you have a battery?</h3>
                <div id="battery-radio-sixth" >
                  <Radio.Group
                    defaultValue={true}
                    id="battery"
                    name="battery"
                    onChange={onChangeRadio}
                    value={radioValue}
                  >
                    <Radio value={true} id="radio-button" >YES</Radio>
                    <Radio value={false} id="radio-button" >NO</Radio>
                  </Radio.Group>
                </div>
              </Col>
            </Row>
            <Row>
              <Col id="col-battery" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item>
                  <div id="div-observation-background">
                    <label id="panel-sixth-label-large">Battery Description</label>
                    <Input
                      placeholder='12V 700Ah Upower'
                      type="text"
                      name="batteryDescription"
                      id="battery-description"
                      value={data.batteryDescription === "" ? batteryDescription : data.batteryDescription}
                      onChange={handleInputChange}
                      onClick={resetInput}
                    />
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col id="col-observation" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Form.Item>
                  <div id="div-observation-background">
                    <label id="panel-sixth-label-large">Observations</label>
                    <Input placeholder='Observations and comments'
                      type="text"
                      name="observation"
                      id="observation"
                      value={data.observation === "" ? observation : data.observation}
                      onChange={handleInputChange}
                      onClick={resetInput}
                    />
                  </div>
                </Form.Item>

              </Col>

              <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
                <Link to="/fifth">
                  <Button id="button-panel-register-previous-sixth">PREVIOUS</Button>
                </Link>
              </Col>
              <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>

                <Button
                  disabled={!isEnabled}
                  id="button-panel-register-next-sixth"
                  type="submit"
                  onClick={handleFormSubmit}>
                  NEXT
                {toLocation ? <Redirect from="/sixth" to="/finished-panel" /> : null}
                </Button>

              </Col>

            </Row>
          </Form>

        </Card>
      </div>
    </Row >
  )
}

export default SixthForm