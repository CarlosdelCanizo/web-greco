import React, { useState, useEffect } from 'react'
import { Card, Button, Row, Col, Icon, Popover, Popconfirm } from 'antd';
import './MyInstallations.css';
import { Link } from "react-router-dom";
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';
import axiosConfig from '../../api/axiosConfig'

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="image"
        id="installation-add-image"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="image"
          id="installation-add-image"
        />
      );
    }
  }
};

function PanelCard({ panel }) {

  const [imageUrl, setImageUrl] = useState();
  //GET IMAGE
  useEffect(() => {
    function getImage(id) {
      axiosConfig({
        url: '/multimedia/' + id + '/getImage/',
        method: 'GET',
        responseType: 'blob'
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setImageUrl(url);
      });
    }
    if ([panel.multimedia] && [panel.multimedia.length] > 0) {
      getImage([panel.multimedia[0].id]);
    } else {
      setImageUrl('no-image');
    }
  }, []);

  const text = 'Are you sure to delete this installation?';

  function confirm() {
    onDeleteClick()
  }

  function onDeleteClick() {
    deleteSolarPanel(panel.id)
    // return deletePanel(id);
  }

  const textMenu = <span id="popover-panels">INSTALLATION</span>;
  const content = (
    <div id="popover-panels">
      <Link to="/show-panel-details">
        <Button id="popover-menu-panels">More details</Button>
      </Link>
      <Link to="/feed-panel">
        <Button id="popover-menu-panels">Feed</Button>
      </Link>
      <Popconfirm
        placement="leftBottom"
        title={text}
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      ><Button id="popover-menu-panels">Delete</Button>
      </Popconfirm>
      <Button id="popover-menu-panels">Edit</Button>
    </div>
  );

  //DELETE SOLAR PANEL
  function deleteSolarPanel(id) {
    var access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))
    axiosConfig.delete("http://10.0.10.195:8088/solarPanel/" + id,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": access_token
        }
      })
      .then(result =>
        console.log("Panel Borrado:", result));

  }

  return (
    <Col span={24} xs={24} sm={24} md={24} lg={12} xl={12}>
      <Card id="installation-container">
        <Row>
          <Col span={24} xs={24} sm={24} md={10} lg={10} xl={10}>
            <div id="installation-tittle-button-container">
              <p id="installation-tittle">{panel.installationName}</p>

              <Popover placement="left" title={textMenu} content={content} trigger="click">
                <Button id="installation-button">
                  <Icon type="more" />
                </Button>
              </Popover>

            </div>
          </Col>
          <div id="installation-add-image-container">
            <PanelImage imageUrl={imageUrl} id="installation-add-image" />
          </div>
          <div id="installation-text-fields">
            <Col span={8}>
              <h5 id="panel-data-labels">
                Electrical capacity
                  </h5>
              <h4 id="panel-data-fields">
                {panel.electrical_capacity} Kw
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Surface
                  </h5>
              <h4 id="panel-data-fields">
                {panel.surface} m²
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="panel-data-labels">
                Inverter capacity
                  </h5>
              <h4 id="panel-data-fields">
                {panel.inverterCapacity} Kw
                  </h4>
            </Col>
          </div>
        </Row>
      </Card>
    </Col>
  );
}

export default PanelCard