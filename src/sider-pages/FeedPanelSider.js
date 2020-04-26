import React, { useState, useEffect } from 'react';
import mobileLogo from '../assets/generation-solar-logo.svg'
import { Layout, Menu, Icon, Divider, Popover } from 'antd';
import { Link } from "react-router-dom";
import './Sider.css';
import MenuHeader from './MenuHeader';
import FeedPanel from '../components/feedPanel/FeedPanel'

var access_token

const { Header, Content, Sider } = Layout;

const FeedPanelSider = (props) => {

  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/feed-panel-sider")

  const [isLoggedIn, setLoggedIn] = useState();

  useEffect(() => {
    access_token = JSON.parse(localStorage.getItem('access_token'))
    if (access_token === null || access_token === undefined) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
      console.log("props", props)
      //props.history.push('/private-mapping-sider')
    }
  }, []);

  const content = (
    <div>
      <p id="pop-over-content">Only for logged users!</p>
    </div>
  );

  function addNewPanel() {
    localStorage.setItem('currentPanelId', JSON.stringify(0))
    localStorage.removeItem("currentPanelState")
  }

  return (
    <Layout>
      {/*MAIN-SLIDER***************************************************************************************************/}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        theme="light"
      >
        <div className="logo" >
          <Link to="/" >
            <img src={mobileLogo} width="70%" height="70%" alt="background-logo" id="logo-sider" />
          </Link>
        </div >
        <Divider id="sider-divider" />
        <Menu theme="light" mode="inline" defaultSelectedKeys={['map']}>

          <Menu.Item key="addNewPanel">
            {isLoggedIn ?
              (<Link to="/first" id={isLoggedIn ? ("logged-public-menu") : ("nav-text")} onClick={addNewPanel}>
                <Icon type="plus-circle" /> Add Installation
              </Link>)
              :
              (
                <Popover content={content} id="popover">
                  <div id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                    <Icon type="plus-circle" /> Add installation
                  </div>
                </Popover>
              )}
          </Menu.Item>

          <Menu.Item key="map">
            {isLoggedIn ?
              (<Link to="/private-mapping-sider" id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                <Icon type="environment" /> Private Map
              </Link>)
              :
              (
                <Popover content={content} id="popover">
                  <div id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                    <Icon type="environment" /> Private Map
                  </div>
                </Popover>
              )}
          </Menu.Item>
          <Menu.Item key="statistics">
            <Link to="/statistics-sider" id="logged-public-menu">
              <Icon type="bar-chart" /> Statistics
            </Link>
          </Menu.Item>
          <Menu.Item key="challenges">
            {isLoggedIn ?
              (<Link to="/my-challenges-sider" id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                <Icon type="trophy" /> My Challenges
              </Link>)
              :
              (
                <Popover content={content} id="popover">
                  <div id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                    <Icon type="trophy" /> My Challenges
                  </div>
                </Popover>
              )}
          </Menu.Item>
          <Menu.Item key="installations">
            {isLoggedIn ?
              (<Link to="/my-installations-sider" id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                <Icon type="cluster" /> My Installations
              </Link>)
              :
              (
                <Popover content={content} id="popover">
                  <div id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                    <Icon type="cluster" /> My Installations
                  </div>
                </Popover>
              )}
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about-sider" id="logged-public-menu">
              <Icon type="exclamation-circle" /> About
            </Link>
          </Menu.Item>
          <Menu.Item key="download">
            <Link to="/download-sider" id="logged-public-menu">
              <Icon type="download" /> Download database
            </Link>
          </Menu.Item>
          <Menu.Item key="privacy">
            <Link to="/privacy-policy-sider" id="logged-public-menu">
              <Icon type="lock" /> Privacy policy
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      {/*MAIN-SLIDER****************************************************************************************************/}
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <MenuHeader />
        </Header>
        <Content style={{ margin: '-16px 0 0 0' }}>
          <div style={{ background: '#eaedf1', minHeight: 360 }}>

            <FeedPanel />

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default FeedPanelSider