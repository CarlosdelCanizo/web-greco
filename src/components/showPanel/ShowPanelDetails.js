import React, { useState, useEffect } from "react"
import { Card, Button, Row, Col, Icon, Input, Form, List, Comment, Divider } from 'antd'
import solar from '../../assets/solar.jpg'
import axiosConfig from '../../api/axiosConfig'
import Header from '../../header/Header'
import "./ShowPanel.css"
import { Link } from "react-router-dom";
import moment from 'moment'
import spinner from "../../assets/spinner.svg";
import noImage from '../../assets/solar-panel.svg';

const PanelImage = ({ imageUrl }) => {
  switch (imageUrl) {
    case null: {
      return <img src={spinner} alt="LOADING..." />;
    }
    case 'no-image': {
      return <img
        src={noImage}
        alt="image"
        id="feed-card-no-image-panel"
      />
    }
    default: {
      return (
        <img
          src={imageUrl}
          alt="image"
          id="feed-card-panel-image"
        />
      );
    }
  }
};

const ShowPanelDetails = (props) => {

  const myPanel = props.location.myPanel

  //GET IMAGE
  const [imageUrl, setImageUrl] = useState();
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
    if ([myPanel.panel.multimedia] && [myPanel.panel.multimedia.length] > 0) {
      getImage([myPanel.panel.multimedia[0].id]);
    } else {
      setImageUrl('no-image');
    }
  }, []);

  return (
    <React.Fragment>
      <Header />
      <div id="show-panel-outside">
        <Card id="show-panel-card-container">
          <Row>
            <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
              <p id="show-panel-card-tittle">{myPanel.panel.installationName}</p>
              <div id="show-panel-button-container">
                <Link to="private-mapping">
                  <Button id="show-panel-close-button">
                    <Icon type="close" />
                  </Button>
                </Link>
              </div>
              <div id="show-panel-card-image-container">
                <PanelImage imageUrl={imageUrl} />
              </div>
            </Col >
          </Row>
          <Row>
            <Col span={8}>
              <h5 id="show-panel-data-labels-card">
                Electrical capacity
                  </h5>
              <h4 id="show-panel-data-fields">
                {myPanel.panel.electrical_capacity} Kw
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="show-panel-data-labels-card">
                Surface
                  </h5>
              <h4 id="show-panel-data-fields">
                {myPanel.panel.surface} m²
                  </h4>
            </Col>
            <Col span={8}>
              <h5 id="show-panel-data-labels-card">
                Inverter capacity
                  </h5>
              <h4 id="show-panel-data-fields">
                {myPanel.panel.inverterCapacity} Kw
                  </h4>
            </Col>
            <Row >
              <div id="feed-panel-user-name-container">
                <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                  <h3 id="feed-panel-user-name" >{myPanel.panel.username}</h3>
                </Col>
              </div>
            </Row>
          </Row>
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels-first">
                Installation property
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.installationProperty}
              </h4>
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels-first">
                Technollogy used
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.technologyUsed}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Tracking orientation
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.panelTrackingOrientation ? (<p>Yes</p>) : (<p>No</p>)}
              </h4>
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Tracking inclination
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.panelTrackingInclination ? (<p>Yes</p>) : (<p>No</p>)}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Orientation
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.orientation}°
                </h4>
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Inclination
                </h5>
              <h4 id="show-panel-data-fields-second">
                {myPanel.panel.inclination}°
                </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Battery
                </h5>
              {myPanel.panel.battery ?
                (<h4 id="show-panel-data-fields-second">
                  Yes
                </h4>)
                :
                (<h4 id="show-panel-data-fields-second">
                  No
                </h4>)
              }
            </Col>
            <Col span={12}>
              <h5 id="show-panel-data-labels">
                Commissioning date
                </h5>
              <h4 id="show-panel-data-fields-second">
                {moment(myPanel.panel.commissioningDate).format('YYYY-MM-DD')}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={24}>
              <h5 id="show-panel-data-labels-third">
                Battery description
                </h5>
              <h4 id="show-panel-data-fields-third">
                {myPanel.panel.batteryDescription}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={24}>
              <h5 id="show-panel-data-labels-third">
                Installation type
                </h5>
              <h4 id="show-panel-data-fields-third">
                {myPanel.panel.installationType}
              </h4>
            </Col>
          </Row>
          <Divider id="show-panel-divider" />
          <Row>
            <Col span={24}>
              <h5 id="show-panel-data-labels-third">
                Observation
                </h5>
              <h4 id="show-panel-data-fields-third">
                {myPanel.panel.observation}
              </h4>
            </Col>
          </Row>
        </Card>
      </div>
    </React.Fragment >
  )
}

export default ShowPanelDetails