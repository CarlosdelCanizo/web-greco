import React, { useState } from "react"
import { Button, Col, Card, Row, Divider, Icon } from 'antd';
import axiosConfig from '../../api/axiosConfig'
import './downloadData.css'
import moment from 'moment'
import { Link } from "react-router-dom";
import PublicMapping from '../../pages/mapping/PublicMapping'

const DownloadData = (props) => {

  const [database, setDatabase] = useState();

  function downLoad() {
    axiosConfig({
      url: '/download/',
      method: 'GET',
      responseType: 'blob'
    })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        let data = moment().format('DD/MM/YYYY_HH:mm')
        link.setAttribute('download', 'solarPanelInfo' + data + '.csv')
        document.body.appendChild(link)
        link.click()
        setDatabase(url);
        console.log("Download:", database)
      });
  }
  document.body.classList.remove('body_forms');
  return (

    <React.Fragment>
      <Row>
        <Col xs={0} sm={0} md={24} lg={24} xl={24} >
          <PublicMapping />
        </Col>
      </Row>
      <Row>
        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card id="download-card-container">
            <Link to="/public-mapping-sider">
              <Button id="download-close-button">
                <Icon type="close" id="icon-x" />
              </Button>
            </Link>
            <h1 id="edit-details-tittle" >Download database</h1>
            <Divider />
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Divider className="transparentDivider" />
              </Col >
            </Row>
            <Row>
              <p id="download-text">Download all the information from the Generation Solar database, in a csv file.
              </p>
              <br />
              <p id="download-text">
                Please cite as: "photovoltaic (PV) installations database” © Generation Solar | CC-BY-4.0
              </p>
              <br />
              <p id="download-text">
                It is impossible to adequately acknowledge the many individuals who have
                contributed to this initiative. We thank them all, and specially <a href="/about-sider">these people</a>.
                </p>
            </Row>
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>

                <Button id="download-button" onClick={downLoad}>DOWNLOAD</Button>

              </Col >
            </Row>

          </Card>
        </Col>
      </Row>
    </React.Fragment >
  );
};

export default DownloadData