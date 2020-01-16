import React from 'react';
import MainMenu from './mainMenu/MainMenu'
import NotificationsMenu from './notificationsMenu/NotificationsMenu'
import UserMenu from './userMenu/UserMenu'
import './Header.css';

class Header extends React.Component {
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
            <NotificationsMenu />
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Header
