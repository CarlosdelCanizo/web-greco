import React, { Component } from 'react';
import { Menu, Icon, Button, Drawer } from 'antd';
import { Link } from "react-router-dom";
import Notification from './Notification'

class NotificationsMenu extends Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <React.Fragment>
        <nav id="navBar">
          <Button onClick={this.showDrawer}>
            <Icon type="bell" />
          </Button>
        </nav>

        <Drawer
          title="NOTIFICATIONS"
          placement="right"
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Menu
            onClick={this.handleClick}
            style={{ width: 256 }}
            mode="inline"
          >
            <Menu.Item key="notifications">
              {/* HOLA */}
              {/* <Notification /> */}
              {/* <Link to="/notifications" className="nav-text">
                <Icon type="user" />
              </Link> */}
            </Menu.Item>
          </Menu>
        </Drawer>
      </React.Fragment>
    );
  }
}

export default NotificationsMenu;