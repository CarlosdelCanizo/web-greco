import React, { useState, useEffect } from 'react';
import { Button, Icon } from 'antd'
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import axiosConfig from '../../api/axiosConfig'
import './imageSlider.css'

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="slider"
        id="slider-image"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="slider"
          id="slider-image"
        />
      );
    }
  }
};

const ImageSlider = ({ multimedia }) => {

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

  return (
    <div>
      <Button
        id="slider-button-left"
        onClick={backward}
        disabled={currentImageId === firstImageId ? true : false}
      >
        <Icon type="left" id="arrow" />
      </Button>

      <Button
        id="slider-button-right"
        onClick={forward}
        disabled={currentImageId === lastImageId ? true : false}
      >
        <Icon type="right" id="arrow" />
      </Button>

      <PanelImage imageUrl={imageUrl} id="slider-image" />
    </div>
  );
}

export default ImageSlider;