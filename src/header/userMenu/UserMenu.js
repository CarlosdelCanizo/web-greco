import React, { Component } from 'react'
import { Menu, Icon, Button, Drawer } from 'antd'
import { Link } from "react-router-dom"
import Profile from '../../utils/profile/Profile'
import iconUser from '../../assets/icon-user.svg'
import axiosConfig from '../../api/axiosConfig'

var access_token



class UserMenu extends Component {
  state = {
    visible: false
  };

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

  logOut = () => {
    localStorage.clear()
    this.isLoggedIn()
    window.location.replace('/login');
  }

  isLoggedIn = () => {
    if (access_token === null) {
      return false
    } else {
      return true
    }
  }



  componentDidMount() {
    access_token = JSON.parse(localStorage.getItem('access_token'))
    // this.isLoggedIn()

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
              <Link to="/edit-user-details" className="nav-text">
                <Icon type="edit" /> Edit details
              </Link>
            </Menu.Item>
            <Menu.Item key="invite">
              <Link to="/invite-friends" className="nav-text">
                <Icon type="team" /> Invite friends
              </Link>
            </Menu.Item>
            <Menu.Item key="logout" >

              {
                (this.isLoggedIn()) ?
                  (<Link to="/welcome" className="nav-text" onClick={this.logOut} >
                    <Icon type="logout" /> Log out
                    </Link>)
                  :
                  (<Link to="/login" className="nav-text">
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