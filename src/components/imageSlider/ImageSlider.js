import React, { useRef, useState } from 'react';
import { Carousel, Row, InputNumber, Button, Icon } from 'antd';
import noImage from '../../assets/solar-panel.svg';
import spinner from "../../assets/spinner.svg";
import axiosConfig from '../../api/axiosConfig'
import './imageSlider.css'


function ImageSlider() {
  const [slide, setSlide] = useState(0);
  // const [imageUrl, setImageUrl] = useState();
  const slider = useRef();

  // const PanelImage = ({ imageUrl }) => {
  //   switch (imageUrl) {
  //     case null: {
  //       return <img src={spinner} alt="LOADING..." />;
  //     }
  //     case 'no-image': {
  //       return <img
  //         src={noImage}
  //         alt="image"
  //         id="public-private-mapping-no-image-panel"
  //       />
  //     }
  //     default: {
  //       return (
  //         <img
  //           src={imageUrl}
  //           alt="image"
  //           id="public-private-mapping-panel-image"
  //         />
  //       );
  //     }
  //   }
  // };

  // //GET PANEL IMAGE
  // function getImage(id) {
  //   axiosConfig({
  //     url: '/multimedia/' + id + '/getImage/',
  //     method: 'GET',
  //     responseType: 'blob'
  //   }).then(response => {
  //     const url = window.URL.createObjectURL(new Blob([response.data]));
  //     setImageUrl(url);
  //   });
  // }

  // if (panel.multimedia && panel.multimedia.length > 0) {
  //   console.log('img exist with id: ', panel.multimedia[0].id);
  //   getImage(panel.multimedia[0].id);
  // } else {
  //   console.log('img not exist');
  //   setImageUrl('no-image');
  // }

  return (
    <div>
      <Row style={{ marginBottom: 10 }}>
        <InputNumber
          min={0}
          max={3}
          value={slide}
          onChange={e => {
            setSlide(e);
            slider.current.goTo(e);
          }}

        />
        <Button onClick={e => {
          setSlide(-1);
          slider.current.goTo(slide);
        }}>
          <Icon type="left" />
        </Button>
        <Button onClick={e => {
          setSlide(1);
          slider.current.goTo(e);
        }}>
          <Icon type="right" />
        </Button>
      </Row>
      <Row>
        <Carousel
          dots={true}
          ref={ref => {
            console.log(ref);
            slider.current = ref;
          }}
        >
          <div>
            <h3>PRUEBA A<img src={noImage} /></h3>
          </div>
          <div>
            <h3>PRUEBA B<img src={noImage} /></h3>
          </div>
        </Carousel>
      </Row>
    </div>
  );
}

export default ImageSlider