import React, { useState, useRef, useEffect } from 'react';
import { Button, Icon, Popconfirm, message } from 'antd'
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
      <div id="container-delete-button-slider">
        <Popconfirm placement="right" title="Are you sure to delete this image?" onConfirm={confirm} >
          <Button id="card-slider-button-delete-image"
          >
            <Icon type="delete" />
          </Button>
        </Popconfirm>
      </div>
      <div id="container-left-button-slider">
        <Button
          id="card-slider-button-left"
          onClick={backward}
          disabled={currentImageId === firstImageId ? true : false}
        >
          <Icon type="left" id="arrow" />
        </Button>
      </div>
      <div id="container-images-slider">
        <PanelImage imageUrl={imageUrl} id="card-slider-image" />
      </div>
      <div id="container-right-button-slider">
        <Button
          id="card-slider-button-right"
          onClick={forward}
          disabled={currentImageId === lastImageId ? true : false}
        >
          <Icon type="right" id="arrow" />
        </Button>
      </div>
    </div>
  );
}

export default CardSlider;