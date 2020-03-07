import React, { Component } from 'react'
import { Menu, Icon, Button, Drawer, message } from 'antd'
import { Link } from "react-router-dom"
import Profile from '../../utils/profile/Profile'
import iconUser from '../../assets/icon-user.svg'
import './userMenu.css'

var access_token

const warning = () => {
  message.warning('Please, log in to view this section', 5);
};

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      isLoggedIn: false
    };
  }

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
    if (!this.state.isLoggedIn && e.key !== "logout") {
      warning()
    }
  };

  logOut = () => {
    localStorage.clear()
    // this.isLoggedIn()
    window.location.replace('/');
  }

  isLoggedIn = () => {
    if (access_token === null || access_token === undefined) {
      this.setState({
        isLoggedIn: false
      });
    } else {
      this.setState({
        isLoggedIn: true
      });
    }
  }

  componentDidMount() {
    access_token = JSON.parse(localStorage.getItem('access_token'))
    this.isLoggedIn()
  }

  render() {

    return (
      <React.Fragment>
        <nav id="navBar">
          <Button onClick={this.showDrawer} id="user-button">
            <img src={iconUser} alt="user-icon" id="user-icon" />
          </Button>
        </nav>

        <Drawer
          title={<Profile />}
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

            <Menu.Item key="edit">
              <Link to="/edit-user-details" id={this.state.isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                <Icon type="edit" /> Edit details
              </Link>
            </Menu.Item>
            <Menu.Item key="invite">
              <Link to="/invite-friends" id={this.state.isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                <Icon type="team" /> Invite friends
              </Link>
            </Menu.Item>
            <Menu.Item key="logout" >

              {
                (this.state.isLoggedIn) ?
                  (<Link to="/welcome" id="logged-public-menu" onClick={this.logOut} >
                    <Icon type="logout" /> Log out
                    </Link>)
                  :
                  (<Link to="/login" id="logged-public-menu">
                    <Icon type="login" /> Log in
                    </Link>)
              }

            </Menu.Item>
          </Menu>
        </Drawer>
      </React.Fragment >
    );
  }
}

export default UserMenu;