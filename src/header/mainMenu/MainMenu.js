import React, { Component } from 'react';
import { Menu, Icon, Drawer, Button, message } from 'antd';
import { Link } from "react-router-dom";
import mainMenuIcon from '../../assets/main-menu.svg'
import './mainMenu.css'


var access_token

const warning = () => {
    message.warning('Please, log in to view this section', 5);
};

class MainMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isLoggedIn: false
        };
    }

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    handleClick = e => {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
        if (!this.state.isLoggedIn && e.key !== "about" && e.key !== "download" && e.key !== "statistics") {
            warning()
        }
    };

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
                    <Button onClick={this.showDrawer} id="main-menu-button">
                        <img src={mainMenuIcon} alt="menu-icon" id="menu-icon" />
                    </Button>
                </nav>

                <Drawer
                    title={<img src={mainMenuIcon} alt="menu-icon" id="menu-icon" />}
                    placement="left"
                    closable={true}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Menu
                        onClick={this.handleClick}
                        style={{ width: 256 }}
                        mode="inline"
                    >
                        <Menu.Item key="add">
                            <Link to="/first" id={this.state.isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                                <Icon type="plus-circle" /> Add Installation
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="map">
                            <Link to="/private-mapping" id={this.state.isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                                <Icon type="environment" /> Private Map
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="statistics">
                            <Link to="/statistics" id="logged-public-menu">
                                <Icon type="bar-chart" /> Statistics
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="challenges">
                            <Link to="/my-challenges" id={this.state.isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                                <Icon type="trophy" /> My Challenges
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="installations">
                            <Link to="/my-installations" id={this.state.isLoggedIn ? ("logged-public-menu") : ("nav-text")}>
                                <Icon type="cluster" /> My Installations
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to="/about" id="logged-public-menu">
                                <Icon type="exclamation-circle" /> About
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="download">
                            <Link to="/download" id="logged-public-menu">
                                <Icon type="download" /> Download database
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default MainMenu;