import React, { Component } from 'react';
import { Menu, Icon, Button, Drawer } from 'antd';
import { Link } from "react-router-dom";
import Profile from '../../../utils/Profile';

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
    // if (e.key === 'logout') {
    //   this.setState(prevState => ({
    //     isLogged: !prevState.isLogged
    //   }));
    // }
  };

  logOut = () => {
    localStorage.clear()
    window.location.replace('');
  }

  isLoggedIn = () => {
    var access_token = JSON.parse(localStorage.getItem('access_token'))
    console.log("dins isLoggedIn;", access_token)
    if (access_token === null) {
      return false
    } else {
      return true
    }
  }

  render() {
    this.isLoggedIn()
    console.log("el state.isLogged", this.isLoggedIn)
    return (
      <React.Fragment>
        <nav id="navBar">
          <Button onClick={this.showDrawer}>
            <Icon type="user" />
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