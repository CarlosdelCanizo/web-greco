import React from 'react';
import MainMenu from './mainMenu/MainMenu'
import NotificationsMenu from './notificationsMenu/NotificationsMenu'
import UserMenu from './userMenu/UserMenu'
import { Link } from "react-router-dom";
import { Badge } from 'antd'
import './Header.css';

class Header extends React.Component {
  state = {
    count: 1,
    show: true
  }

  increase = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  };

  decline = () => {
    let count = this.state.count - 1;
    if (count < 0) {
      count = 0;
    }
    this.setState({ count });
  };

  onChange = show => {
    this.setState({ show });
  };

  render() {
    return (
      <React.Fragment>
        <nav id="navBar">
          <div id="mainMenu">
            <MainMenu />
          </div>
          <div id="userMenu">
            <UserMenu />
          </div>
          <div id="notificationsMenu">

            {/* <Link to="/notifications" className="nav-text"> */}
            <NotificationsMenu>
              <Badge onChange={this.onChange} checked={this.state.show} dot>

              </Badge>
            </NotificationsMenu>
            {/* </Link> */}

          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header
