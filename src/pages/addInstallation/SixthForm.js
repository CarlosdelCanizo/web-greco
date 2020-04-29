import React, { useState, useContext } from "react"
import { Form, Card, Radio, Button, Row, Col, message, Upload, Icon, Select, Input, Tooltip } from 'antd'
import { Link } from "react-router-dom"
import axiosConfig from '../../api/axiosConfig'
import bulletPle from '../../assets/bullet-lleno.svg'
import bulletBuit from '../../assets/bullet-vacio.svg'
import './sixthForm.css'
import { ProfileContext } from '../../utils/profile/ProfileContext'

const SixthForm = (props) => {

  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/sixth")

  const profileContext = useContext(ProfileContext)
  var username = profileContext.username

  var installationName, installationProperty, battery, batteryDescription, observation;

  //GET FROM LOCAL STORAGE
  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'));
  var currentPanelId = JSON.parse(localStorage.getItem("currentPanelId"));
  var currentPanelState = JSON.parse(localStorage.getItem("currentPanelState"));
  // var myPanel = JSON.parse(localStorage.getItem("myPanel"));

  //PREFILL FILELIST
  const baseURL = "http://10.0.10.195:8088/"

  // const defaultfilelist = [
  //   {
  //     uid: myPanel.multimedia[0].id,
  //     name: myPanel.multimedia[0].name,
  //     url: baseURL + 'multimedia/' + myPanel.multimedia[0].id + '/getImage/'
  //   },
  //   {
  //     uid: myPanel.multimedia[1].id,
  //     name: myPanel.multimedia[1].name,
  //     url: baseURL + 'multimedia/' + myPanel.multimedia[1].id + '/getImage/'
  //   },
  //   {
  //     uid: myPanel.multimedia[2].id,
  //     name: myPanel.multimedia[2].name,
  //     url: baseURL + 'multimedia/' + myPanel.multimedia[2].id + '/getImage/'
  //   }
  // ]

  // var uid1 = myPanel.multimedia[0].id
  // var name1 = myPanel.multimedia[0].name
  // var url1 = baseURL + 'multimedia/' + myPanel.multimedia[0].id + '/getImage/'

  // function FileList(props) {
  //   return (
  //     <div>
  //       {props.items.map((item, index) => (
  //         <Item key={index} item={item} />
  //       ))}
  //     </div>
  //   );
  // }

  //TO MANAGE IMAGES
  const [images, setImages] = useState(
    {
      previewVisible: true,
      previewImage: '',
      fileList: [
        // {
        //   uid: uid1,
        //   name: name1,
        //   url: url1
        // }
      ]
    }
  );

  if (currentPanelState !== null) {
    installationName = currentPanelState.installationName
    installationProperty = currentPanelState.installationProperty
    battery = currentPanelState.battery
    batteryDescription = currentPanelState.batteryDescription
    observation = currentPanelState.observation
  }

  const [data, setData] = useState(currentPanelState);
  const { Option } = Select;
  var panelResponseId //FOR IMAGES ON POST
  var currentPanelId //FOR IMAGES ON PUT
  var errorImageToUpload = false; //ERROR IMAGE


  const errorServer = () => {
    message.error('You can´t post/update your installation now. Please, log in again and try later.', 5);
  };

  const errorImages = () => {
    message.error('You can´t upload images now. Please, log in again and try later.', 5);
  };

  const warningFields = () => {
    message.warning('Property is required.', 5);
  };

  //RadioGroup
  const [radioValue, setRadioValue] = useState(battery);
  const onChangeRadio = event => {
    let value = event.target.value
    setRadioValue(value);
    setData({ ...data, battery: value })
  }

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
    if (currentPanelId > 0) {
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
          localStorage.setItem('idPanelFromPostPanel', JSON.stringify(panelResponseId))
          if (images.fileList.length === 0) {
            console.log("No images added")
            props.history.push("/finished-panel")
          } else {
            uploadImage()
          }
        }
      })
      .catch(function (error) {
        console.log("Post panel error:", error);
        errorServer();
        if (error === undefined) {
          // NetWork Error  
          setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
        }
        if (error !== undefined && error.response !== undefined) {
          if (error.response.data.status === 400) {
            // bad credentials  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 404) {
            //  not found  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 500) {
            // Server error  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
        }
      });
  }

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
      installationType: data.installationType
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
          var data = response.data
          if (images.fileList.length === 0) {
            console.log("No images to add", images)
            props.history.push("/finished-panel")
          } else {
            uploadImage()
          }
        }
      })
      .catch(function (error) {
        console.log("Upload Error:", error)
        errorServer()
        if (error === undefined) {
          // NetWork Error  
          setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
        }
        if (error !== undefined && error.response !== undefined) {
          if (error.response.data.status === 400) {
            // bad credentials  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 404) {
            //  not found  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 500) {
            // Server error  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
        }
      });
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      errorImageToUpload = true;
    }
    const isLt5M = file.size
    console.log("Mida fitxer", isLt5M)
    if (isLt5M > 5242880) {
      message.error('Image must be smaller than 5MB!');
      errorImageToUpload = true;
    }
    if (isJpgOrPng && isLt5M < 5242880) {
      errorImageToUpload = false;
    }
    return false;
  }

  //Handler uploadImages
  const handlePreview = file => {
    setImages({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  const handleUploadImages = ({ fileList }) => {
    if (errorImageToUpload) {
      console.log("Image upload error")
    } else {
      setImages({ fileList });
    }
  };

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
        console.log("response upload image: ", response)
        if (response.status === 200) {
          const data = response.data
          localStorage.setItem('multimedia', JSON.stringify(data))
          props.history.push("/finished-panel")
          // throw response
        }
      })
      .catch(function (error) {
        console.log("Upload Image Error", error)
        errorImages()
        if (error === undefined) {
          // NetWork Error  
          setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
        }
        if (error !== undefined && error.response !== undefined) {
          if (error.response.data.status === 400) {
            // bad credentials  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 403) {
            // You can´t upload more multimedia. Limit exceeded  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 404) {
            //  not found  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
          if (error.response.data.status === 500) {
            // Server error  
            setData({ ...data, isSubmitting: false, errorMessage: error.response.data.message });
          }
        }
      });
  }

  function clearPanel() {
    localStorage.removeItem("currentPanelState")
    localStorage.removeItem("currentPanelId")
  }

  const isEnabled =
    //(data.installationName !== undefined && data.installationName.length > 0 || installationName && installationName !== undefined && installationName > 0) &&
    (data.installationProperty !== undefined && data.installationProperty.length > 0 || installationProperty && installationProperty !== undefined && installationProperty > 0);
  //(data.battery !== undefined || battery && battery !== "" && battery !== undefined) &&
  //(data.batteryDescription !== undefined && data.batteryDescription.length > 0 || batteryDescription && batteryDescription !== undefined && batteryDescription > 0) &&
  //(data.observation !== undefined && data.observation.length > 0 || observation && observation > 0)


  const serial = <span>If possible, include the serial number of the panel for a quick identification</span>;

  function checkTracking() {
    if (currentPanelState.panelTrackingInclination === true && currentPanelState.panelTrackingInclination === true) {
      props.history.push('/third')
    }
    if (currentPanelState.panelTrackingOrientation === true && currentPanelState.panelTrackingInclination === false) {
      props.history.push('/fifth')
    }
    if (currentPanelState.panelTrackingInclination === true && currentPanelState.panelTrackingOrientation === false) {
      props.history.push('/fourth')
    }
    if (currentPanelState.panelTrackingOrientation === false && currentPanelState.panelTrackingInclination === false) {
      props.history.push('/fifth')
    }
  }

  return (
    <Row>
      <Card id="card-panel-register-inside">
        <Form onSubmit={handleFormSubmit}>
          <Row>

            <Col xs={2} sm={2} md={2} lg={2} xl={2} />

            <Col xs={20} sm={20} md={20} lg={20} xl={20}>
              <div id="pagination">
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletBuit} width="2%" id="pagination-bullet" />
                <img src={bulletPle} width="2%" id="pagination-bullet" />
              </div>
            </Col>

            <Col xs={2} sm={2} md={2} lg={2} xl={2}>

              <Link to="/my-installations-sider">
                <Button id="forms-close-button" onClick={clearPanel}>
                  <Icon type="close" id="icon-x" />
                </Button>
              </Link>

            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h2 id="tittle-panel-registration">Details of your installation</h2>
            </Col>
          </Row>
          <Row >
            <Col id="register-panel-fields-sixth-left" xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-installation-background">
                  <label id="panel-sixth-label">Name of your installation</label>
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
            <Col id="register-panel-fields-sixth-right" xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item>
                <div id="div-installation-background-right">
                  <label id="panel-sixth-label">Property</label>
                  <Select placeholder='Private'
                    name="installationProperty"
                    id="installation-property"
                    value={data.installationProperty || installationProperty}
                    onChange={handleInputSelectChange}
                  >

                    <Option id="select-property" value="Public">Public</Option>
                    <Option id="select-property" value="Private me">Private (owned by me)</Option>
                    <Option id="select-property" value="Private other">Private (owned by someone else)</Option>

                  </Select>
                </div>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <h2 id="subtittle-panel-registration-sixth">Upload an image</h2>

              <div id="upload-images">
                <Upload
                  listType="picture"
                  fileList={images.fileList}
                  onPreview={handlePreview}
                  onChange={handleUploadImages}
                  // beforeUpload={() => false}
                  beforeUpload={beforeUpload}
                  name="multimedia"
                >
                  {images.fileList.length >= 3 ? (null) : (
                    <Button>
                      <p id="upload-text-one">+ Upload images</p>
                    </Button>
                  )}
                  <p>Maximum 3 images per installation</p>
                  <p>Only png or jpg, with max size of 5 MB each one</p>
                  {/* <DefaultFileList defaultfilelist={{ defaultfilelist }} /> */}
                </Upload>
              </div>
            </Col>
          </Row>


          <Col id="col-battery" xs={24} sm={24} md={24} lg={24} xl={24}>
            <Row>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <h3 id="subtittle-panel-registration-battery"> Does it have a battery?</h3>
              </Col>
              <Col xs={12} sm={12} md={12} lg={12} xl={12}>
                <div id="battery-radio-sixth" >
                  <Radio.Group
                    defaultValue={true}
                    id="battery"
                    name="battery"
                    onChange={onChangeRadio}
                    value={radioValue}
                  >
                    <Radio value={true} id="radio-button" >Yes</Radio>
                    <Radio value={false} id="radio-button" >No</Radio>

                  </Radio.Group>
                </div>
              </Col>
            </Row>
          </Col>


          <Row>
            <Col id="col-battery" xs={24} sm={24} md={24} lg={24} xl={24}>
              <Form.Item>
                <div id="div-observation-background">
                  <label id="panel-sixth-label-large">Battery description</label>
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
            <Col id="col-observation" xs={24} sm={24} md={24} lg={24} xl={24}>
              <Tooltip placement="top" title={serial}>
                <Form.Item>
                  <div id="div-observation-background">
                    <label id="panel-sixth-label-large">Observations</label>
                    <Input placeholder='Add more information that can be relevant'
                      type="text"
                      name="observation"
                      id="observation"
                      value={data.observation === "" ? observation : data.observation}
                      onChange={handleInputChange}
                      onClick={resetInput}
                    />
                  </div>
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>

          <div id="error-panel-post-update-message">
            {data.errorMessage && (<p>{data.errorMessage}</p>)}
          </div>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>

              <Button id="button-panel-register-previous-sixth" onClick={checkTracking}>BACK</Button>

            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>

              <Button
                // disabled={!isEnabled}
                id="button-panel-register-next-sixth"
                type="submit"
                onClick={isEnabled ? (handleFormSubmit) : (warningFields)}>
                NEXT
              </Button>

            </Col>
          </Row>
        </Form>

      </Card>
    </Row >
  )
}

export default SixthForm