import React from 'react';
import { Menu } from 'antd';
import NotificationsMenu from '../header/notificationsMenu/NotificationsMenu'
import UserMenu from '../header/userMenu/UserMenu'
import { Badge } from 'antd'
import './Sider.css';

class MenuHeader extends React.Component {
  state = {
    current: 'navigation'
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key
    });
  };

  getPage() {
    let pathname = window.location.pathname;
    let ping = pathname.replace("ping", "")
    let first = ping.replace("/", "");
    let second = first.replace("-sider", "");
    let third = second.replace(/-/g, " ");
    let page = third.charAt(0).toUpperCase() + third.slice(1);
    return page
  }

  render() {
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">

        <Menu.Item key="navigation" >
          <div id="page-title">
            {this.getPage()}
          </div>
        </Menu.Item>

        <div id="userMenu">
          <UserMenu />
        </div>

        <div id="notifications-menu">

          {/* <Link to="/notifications" className="nav-text"> */}
          <NotificationsMenu>
            <Badge onChange={this.onChange} checked={this.state.show} dot />
          </NotificationsMenu>
          {/* </Link> */}

        </div>

      </Menu >
    );
  }
}

export default MenuHeader;