import React, { Component } from 'react';
import { Menu, Icon, Button, Drawer } from 'antd';
import { Link } from "react-router-dom";

class NotificationsMenu extends Component {
  state = { visible: false };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <nav id="navBar">
        <Button onClick={this.showDrawer} id="notifications-button">
          <Link to="/notifications" className="nav-text">
            <Icon type="bell" />
          </Link>
        </Button>
      </nav>
    );
  }
}

export default NotificationsMenu;