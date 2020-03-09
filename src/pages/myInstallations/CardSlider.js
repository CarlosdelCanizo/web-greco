import React, { useState, useRef, useEffect } from 'react';
import { Button, Icon, Popconfirm, message, Row, Col } from 'antd'
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import axiosConfig from '../../api/axiosConfig'
import './MyInstallations.css'

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="image"
        id="card-slider-installation-add-image"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="image"
          id="card-slider-installation-add-image"
        />
      );
    }
  }
};

const CardSlider = ({ multimedia }) => {

  var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

  var firstImageId
  var lastImageId

  if (multimedia && multimedia.length > 0) {
    firstImageId = multimedia[0].id
    lastImageId = firstImageId + (multimedia.length - 1)
  } else {
    firstImageId = null
    lastImageId = null
  }

  const [currentImageId, setCurrentImageId] = useState(firstImageId)
  const [imageUrl, setImageUrl] = useState();

  //GET IMAGE FOR SLIDER
  useEffect(() => {
    if (currentImageId === null) {
      setImageUrl('no-image');
    }
    function getImage(currentImageId) {
      axiosConfig({
        url: '/multimedia/' + currentImageId + '/getImage/',
        method: 'GET',
        responseType: 'blob'
      })
        .then(response => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          setImageUrl(url);
        });
    }
    getImage(currentImageId)

  }, [currentImageId]);


  function forward() {
    setCurrentImageId(currentImageId + 1);
  }

  function backward() {
    setCurrentImageId(currentImageId - 1);
  }

  const deleteImage = (id) => {
    axiosConfig.delete('/multimedia/' + id,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(response => {
        console.log("Delete image:", response);
      })
      .then(error => {
        console.log("ERROR delete image:", error);
      })
  }

  function confirm() {
    deleteImage(currentImageId)
    setImageUrl(noImage);
  }

  return (
    <div id="container">
      {/* <div id="container-delete-button-slider">
        {<Popconfirm placement="right" title="Are you sure to delete this image?" onConfirm={confirm} >
          <Button id="card-slider-button-delete-image"
          >
            <Icon type="delete" />
          </Button>
        </Popconfirm>}
      </div> */}
      <Row>
        <Col id="col-slider-left-button" xs={2} sm={2} md={2} lg={2} xl={2}>
          <Button
            id="card-slider-button-left"
            onClick={backward}
            disabled={currentImageId === firstImageId ? true : false}
          >
            <Icon type="left" id="arrow" />
          </Button>
        </Col>
        <Col xs={16} sm={16} md={20} lg={20} xl={20}>

          <PanelImage imageUrl={imageUrl} />

        </Col>
        <Col id="col-slider-right-button" xs={2} sm={2} md={2} lg={2} xl={2}>
          <Button
            id="card-slider-button-right"
            onClick={forward}
            disabled={currentImageId === lastImageId ? true : false}
          >
            <Icon type="right" id="arrow" />
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default CardSlider;