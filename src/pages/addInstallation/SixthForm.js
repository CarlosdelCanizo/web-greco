import React, { useState } from "react"
import { Form, Card, Radio, Button, Row, Col, Divider, Upload, Icon, message } from 'antd'
import { Link, Redirect } from "react-router-dom"
import axios from 'axios'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './sixthForm.css'

function SixthForm(props) {

  var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
  const [data, setData] = useState(currentPanelState);
  var currentPanelId
  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

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
      previewVisible: true,
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
    console.log("HOK IMAGES:", images)
    // setData({ ...data, [data.multimedia]: fileList });
  };

  //Form handlers
  const handleInputChange = event => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist()
    localStorage.setItem('currentPanelState', JSON.stringify(data))
    postPanel()
    activateRedirection()
  }

  function postPanel() {
    // console.log("USERNAME:", username)
    var panelForSubmit = JSON.parse(localStorage.getItem('currentPanelState'))
    // panelTransform(panelForSubmit)
    console.log("panel for submit", panelForSubmit)
    var body = {
      username: "Txema Sanchis",
      solarPanel: panelForSubmit
    }
    axios.post("http://10.0.10.195:8088/solarPanel", (body),
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        if (response.status === 200) {
          currentPanelId = response.data.solarPanel.id
          console.log("La ID del panel:", currentPanelId)
          console.log("Resposta del server PANEL:", response.data)
          localStorage.setItem('currentPanelId', JSON.stringify(currentPanelId))
          uploadImage()
          activateRedirection()
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log("RESPUESTA ERROR:", error);
      });
  }

  //UPLOAD IMAGE
  function uploadImage() {
    const formData = new FormData()
    var multimedia = images.fileList[0].originFileObj
    formData.append("file", multimedia)
    console.log("imagens hook", images)
    console.log("multimedia", multimedia)
    console.log("el FORMA DATA", formData)
    axios.post("http://10.0.10.195:8088/multimedia/upload/" + currentPanelId, formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": access_token
        }
      })

      .then(response => {
        if (response.status === 200) {
          console.log("YUJUUU AHÍ VA LA IMATGE!!!", response);
          throw response
        }
      })

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
                  listType="picture"
                  fileList={images.fileList}
                  onPreview={handlePreview}
                  onChange={handleUploadImages}
                  beforeUpload={() => false}
                  name="multimedia"
                // fileList={fileList}
                // onChange={handleUpload}
                // {...propsImages}
                >
                  <Button>
                    <p id="upload-text-one">+ Upload images</p>
                  </Button>
                  <p>Maximum 3 images per installation</p>
                  <p>Only png or jpg, with max size of 5 MB each one</p>
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
                {/* {toLocation ? <Redirect from="/sixth" to="/finished-panel" /> : null} */}
              </Button>

            </Col>
          </Form>
        </Card>
      </div>
    </Row >
  )
}

export default SixthForm