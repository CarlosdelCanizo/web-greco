import React, { useState, useEffect, useContext, useCallback } from "react"
import { Input, Button, Form, Icon, Col, Card, Row } from 'antd';
import axiosConfig from '../../api/axiosConfig'
import Header from '../../header/Header'
import './downloadData.css'
import { Link } from "react-router-dom";
import spinner from "../../assets/spinner.svg";
import moment from 'moment'


const access_token = 'Bearer ' + JSON.parse(localStorage.getItem('access_token'))

const DownloadData = (props) => {

  const [database, setDatabase] = useState();

  function downLoad() {
    axiosConfig({
      url: '/download/',
      // headers: { "Authorization": access_token },
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

  return (

    <React.Fragment>
      <Header />
      <div id="panel-download-outside">
        <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
          <Card id="download-card-container">
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <h1>Download database</h1>
              </Col >
            </Row>
            <Row>
              <Col span={24} xs={24} sm={24} md={24} lg={24} xl={24}>
                <Button onClick={downLoad}>DOWNLOAD</Button>
              </Col >
            </Row>

          </Card>
        </Col>
      </div>
    </React.Fragment >
  );
};

export default DownloadData