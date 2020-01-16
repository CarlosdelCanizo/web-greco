import React, { useState, useEffect } from "react"
import { Form, Card, Radio, Button, Row, Col, Divider, Upload, Icon, message } from 'antd'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import noImage from '../../assets/no-image.svg'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './sixthForm.css'

function SixthForm(props) {

  var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
  const [data, setData] = useState(currentPanelState);

  //RadioGroup
  const [radioValue, setRadioValue] = useState();
  const onChangeRadio = e => {
    setRadioValue({
      radioValue: e.target.value,
    });
    console.log("el radio value:", radioValue)
    setData({ ...data, battery: e.target.value })
  }

  //Upload Images
  const [images, setImages] = useState(
    {
      previewVisible: false,
      previewImage: '',
      fileList: []
    }
  );
  const handlePreview = file => {
    setImages({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  const handleUploadImages = ({ fileList }) => {
    console.log('fileList', fileList);
    setImages({ fileList });
    //"handleSubmit", pero al localstorage:
    // let formData = new FormData();
    // formData.append("file", images.fileList[0].originFileObj);
    // console.log("formData!!", formData)
    setData({ ...data, [data.multimedia]: fileList });
  };

  // HANDLE SUBMIT AUTÈNTIC
  // const handleSubmitImages = event => {
  //   let formData = new FormData();
  //   formData.append("file", images.fileList[0].originFileObj);
  //   console.log("formData!!", formData)
  // }

  //Form handlers
  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    // setData({ ...data });
    localStorage.setItem('currentPanelState', JSON.stringify(data))
    postPanel()
    activateRedirection()
  }

  //LOCAL STORAGE IMAGE
  // localStorage.setItem('image', JSON.stringify(image))
  // localStorage.setItem('currentImageId', JSON.stringify(currentImageId))
  // localStorage.setItem('currentImageName', JSON.stringify(currentImageId))
  // console.log("Imatge per guardar al LOCALSTORAGE:", image)

  // axios.post("http://10.0.10.195:8088/multimedia/upload/" + panelId, data,
  //     {
  //         headers: {
  //             "Content-Type": "multipart/form-data",
  //             "Authorization": access_token
  //         }
  //     })

  //     .then(response => {
  //         if (response.status === 200) {
  //             currentImageId = (response.data.id)
  //             console.log(currentImageId)
  //             // getImages(currentImageId)
  //             throw response
  //         }
  //     })

  // }

  //GET IMAGE
  // function getImages(currentImagelId) {
  //     axios.get("http://10.0.10.195:8088/multimedia/" + currentImagelId + "/getImage/")
  //         .then(response => {
  //             if (response.status === 200) {
  //                 // debugger
  //                 console.log(response.data)
  //                 currentImagePath = "http://10.0.10.195:8088/multimedia/" + currentImageId + "/getImage/"
  //                 console.log(currentImagePath)
  //                 throw response;
  //             }
  //         })
  // }
  function panelTransform(panelForSubmit) {
    // panelForSubmit = delete panelForSubmit.id;
    var panelForSubmit = JSON.parse(localStorage.getItem('currentPanelState'))
    var electrical_CapacityMod = parseFloat(panelForSubmit.electrical_capacity)
    var surfaceMod = parseFloat(panelForSubmit.surface)
    var inverterCapacityMod = parseFloat(panelForSubmit.inverterCapacity)
    panelForSubmit.electrical_capacity = electrical_CapacityMod
    panelForSubmit.surface = surfaceMod
    panelForSubmit.inverterCapacity = inverterCapacityMod
    console.log("panelForSubmit transformacio", panelForSubmit)
  }

  function postPanel() {
    // console.log("USERNAME:", username)

    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    var panelForSubmit = JSON.parse(localStorage.getItem('currentPanelState'))
    // panelTransform(panelForSubmit)
    console.log("panel for submit", panelForSubmit)
    var body = {
      photographOfInstallation: "Txema.Sanchis",
      solarPanel: panelForSubmit
    }
    // const body = {
    //     photographOfInstallation: "Txema.Sanchis",
    //     solarPanel:
    //     {
    //         lat: 39.8896017,
    //         lon: -0.0754226,
    //         panelTrackingOrientation: false,
    //         panelTrackingInclination: false,
    //         orientation: 68,
    //         inclination: 34,
    //         commissioningDate: "2019-12-12",
    //         multimedia: [],
    //         technologyUsed: "Policristalino",
    //         surface: 15,
    //         electricalCapacity: 1450,
    //         inverterCapacity: 1450,
    //         battery: true,
    //         batteryDescription: "Ion-litio",
    //         observation: "Prueba Txema",
    //         installationName: "Txema´s house",
    //         installationProperty: "Private",
    //         installationType: "Autoconsumo"

    //     }
    // }
    axios.post("http://10.0.10.195:8088/solarPanel", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        if (response.status === 200) {
          const currentPanelId = response.data
          console.log("LO QUE VOLS:", currentPanelId)
          localStorage.setItem('currentPanelId', JSON.stringify(currentPanelId))
          // uploadImage()
          activateRedirection()
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log("RESPUESTA ERROR:", error);
      });
  }

  //REDIRECT
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
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletBuit} width="2%" id="pagination-bullet" />
              <img src={bulletPle} width="2%" id="pagination-bullet" />
            </div>
          </Col>
          <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
            <h2 id="tittle-panel-registration">Additional information</h2>
          </Col>
          <Form onSubmit={handleFormSubmit}>
            <Col id="register-panel-fields-sixth" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <label id="label-panel-six-large">Instalation name</label>
                <Divider id="divider-input-sixth" />
                <input placeholder='My installation' type="text" name="installationName" id="installation-name"
                  values={data.installationName}
                  onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col id="register-panel-fields-sixth" span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <label id="label-panel-six-large">Installation property</label>
                <Divider id="divider-input-sixth" />
                <select placeholder='Private' name="installationProperty" id="installation-property"
                  value={data.installationProperty}
                  onChange={handleInputChange}
                >
                  <option id="select-property" values="Public">Public</option>
                  <option id="select-property" values="Private">Private</option>
                </select>

              </Form.Item>
            </Col>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <h2 id="subtittle-panel-registration-sixth">Installation photography</h2>

              <div id="upload-images">
                <Upload
                  name="multimedia"
                  listType="picture"
                  fileList={images.fileList}
                  onPreview={handlePreview}
                  onChange={handleUploadImages}
                  beforeUpload={() => false}
                // fileList={fileList}
                // onChange={handleUpload}
                // {...propsImages}
                >
                  <Button>
                    <p id="upload-text-one">+ Upload images</p>
                  </Button>
                  <p>Only png, jpg, with max size of 5 MB</p>
                </Upload>
              </div>

              {/* <div id="image-fields-container">
                <input icon='folder open outline' type="file" id="upload-img"
                  name="file" placeholder='Search picture...'
                // onChange={handleImageChange} 
                />
              </div>
              <Button circular icon="upload" onClick={handleImageUpload} id="upload-img-button">
              </Button>
              <div id="image-preview">
                <h3 id="text-panel-registration-sixth">Attached pictures</h3>

                {image.preview ? <img src={image.preview} width="60" height="60" alt="preview" id="preview-sixth" />
                  : (<img src={noImage} id="no-image-sixth" />)}

              </div> */}
            </Col>
            <Col id="col-battery" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <h3 id="subtittle-panel-registration-battery"> Do you have a battery?</h3>
              <div id="battery-radio-sixth" >
                <Radio.Group defaultValue={true}
                  id="battery" name="battery"
                  onChange={onChangeRadio}
                  value={radioValue}
                >
                  <Radio value={true} id="radio-button" >YES</Radio>
                  <Radio value={false} id="radio-button" >NO</Radio>
                </Radio.Group>
              </div>
            </Col>
            <Col id="col-battery" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label id="label-panel-very-large">Battery Description</label>
                <input
                  placeholder='12V 700Ah Upower' type="text" name="batteryDescription" id="battery-description"
                  values={data.batteryDescription} onChange={handleInputChange}
                />
              </Form.Item>
            </Col>
            <Col id="col-observation" span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <label id="label-panel-very-large">Observations</label>
                <input placeholder='Observations and comments' type="text" name="observation" id="observation"
                  values={data.observation} onChange={handleInputChange}
                />
              </Form.Item>

            </Col>
            <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>
              <Link to="/fifth">
                <Button id="button-panel-register-previous-sixth">PREVIOUS</Button>
              </Link>
            </Col>
            <Col span={12} xs={12} sm={12} md={12} lg={12} xl={12}>

              <Button id="button-panel-register-next-sixth" type="submit" onClick={handleFormSubmit}>
                NEXT
                {toLocation ? <Redirect from="/sixth" to="/finished-panel" /> : null}
              </Button>

            </Col>
          </Form>
        </Card>
      </div>
    </Row >
  )
}

export default SixthForm