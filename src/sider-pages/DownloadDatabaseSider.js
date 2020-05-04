import React, { useState, useEffect } from 'react';
import mobileLogo from '../assets/generation-solar-logo.svg'
import { Layout, Menu, Icon, Divider, message, Popover } from 'antd';
import { Link } from "react-router-dom";
import './Sider.css';
import DownloadData from '../header/dataBase/DownloadData';
import MenuHeader from './MenuHeader';
import SiderMenu from './SiderMenu'

const { Header, Content, Sider } = Layout;

const DownloadDatabaseSider = (props) => {

  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/download-sider")

  return (
    <Layout>
      <Sider
        id="sider-layout"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        theme="light"
      >

        <SiderMenu />

      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <MenuHeader />
        </Header>
        <Content style={{ margin: '-16px 0 0 0' }}>
          <div style={{ background: '#eaedf1', minHeight: 360 }}>

            <DownloadData />

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default DownloadDatabaseSider