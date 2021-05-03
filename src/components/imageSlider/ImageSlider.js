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


  if (multimedia.length > 0) {
    var firstImageId = multimedia[0].id
    var lastImageId = multimedia[multimedia.length - 1].id
  } else {
    var firstImageId = null
    var lastImageId = null
  }

  const [currentImageId, setCurrentImageId] = useState(firstImageId)
  const [imageUrl, setImageUrl] = useState();

  //GET IMAGE FOR SLIDER
  useEffect(() => {
    if (currentImageId === null || currentImageId === undefined) {
      setImageUrl('no-image');
    } else {
      getImage(currentImageId);
    }

  }, [currentImageId]);

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

  function forward() {
    var actual = currentImageId
    console.log("forward MULTIMEDIA", multimedia)
    if (actual === multimedia[0].id && multimedia.length > 1) {
      setCurrentImageId(multimedia[1].id)
    }
    else if (actual === multimedia[multimedia.length - 1].id) {
      /* Si es la última no puedo seguir adelante */
    }
    else {
      setCurrentImageId(multimedia[2].id)
    }
  }


  function backward() {
    //setCurrentImageId(currentImageId - 1);
    console.log("backward MULTIMEDIA", multimedia)
    var actual = currentImageId
    var position_actual = 0
    for (var i = 0; i < multimedia.length - 1; i++) {
      if (multimedia[i].id == actual)
        position_actual = i
    }

    if (actual === multimedia[0].id) {
      /*Es la primera, no hay anterior*/
      /* setCurrentImageId(currentImageId);*/
    }
    else if (actual == multimedia[1].id) {
      /*Si es la última, la anterior es la del mig*/
      setCurrentImageId(multimedia[0].id)
    }
    else {

      /*Si es la última, la anterior es la del mig*/
      setCurrentImageId(multimedia[1].id)
    }
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