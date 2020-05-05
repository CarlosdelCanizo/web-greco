import React, { useState, useEffect } from 'react';
import mobileLogo from '../assets/generation-solar-logo.svg'
import { Layout, Menu, Icon, Divider, Popover } from 'antd';
import { Link } from "react-router-dom";
import './Sider.css';

var access_token

const { Sider } = Layout;

const SiderMenu = (props) => {

  const [isLoggedIn, setLoggedIn] = useState();

  useEffect(() => {
    access_token = JSON.parse(localStorage.getItem('access_token'))
    if (access_token === null || access_token === undefined) {
      setLoggedIn(false);
    } else {
      setLoggedIn(true);
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
    localStorage.removeItem("myPanel")
  }

  function getPage() {
    let pathname = window.location.pathname;
    let ping = pathname.replace("ping", "")
    let first = ping.replace("/", "");
    let second = first.replace("-sider", "");
    let third = second.replace(/-/g, " ");
    let page = third.charAt(0).toUpperCase() + third.slice(1);
    return page
  }

  var defaultPage = getPage()

  return (
    <Layout>
      <Sider>
        <div className="logo" >
          <Link to="/" >
            <img src={mobileLogo} width="70%" height="70%" alt="background-logo" id="logo-sider" />
          </Link>
        </div >
        <Divider id="sider-divider" />
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={defaultPage}
        >

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

          <Menu.Item key="Private map">
            {isLoggedIn ?
              (<Link to="/private-mapping-sider" id={isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                <Icon type="environment" /> Private Map
              </Link>)
              :
              (
                (<Link to="/public-mapping-sider" id={"logged-public-menu"}>
                  <Icon type="environment" /> Public Map
                </Link>)
              )}
          </Menu.Item>
          <Menu.Item key="Statistics">
            <Link to="/statistics-sider" id="logged-public-menu">
              <Icon type="bar-chart" /> Statistics
            </Link>
          </Menu.Item>
          <Menu.Item key="My challenges">
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
          <Menu.Item key="My installations">
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
          <Menu.Item key="About">
            <Link to="/about-sider" id="logged-public-menu">
              <Icon type="exclamation-circle" /> About
            </Link>
          </Menu.Item>
          <Menu.Item key="Download">
            <Link to="/download-sider" id="logged-public-menu">
              <Icon type="download" /> Download database
            </Link>
          </Menu.Item>
          <Menu.Item key="Privacy policy">
            <Link to="/privacy-policy-sider" id="logged-public-menu">
              <Icon type="lock" /> Privacy policy
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default SiderMenu