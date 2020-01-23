import React, { Component } from 'react';
import { Menu, Icon, Drawer, Button } from 'antd';
import { Link } from "react-router-dom";

class MainMenu extends Component {
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
                        <Icon type="menu" />
                    </Button>
                </nav>

                <Drawer
                    title={<Icon type="menu" id="main-menu-tittle-icon" />}
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
                        <Menu.Item key="map">
                            <Link to="/private-mapping" className="nav-text">
                                <Icon type="environment" /> Map
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="statistics">
                            <Link to="/my-statistics" className="nav-text">
                                <Icon type="bar-chart" /> Statistics
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="challenges">
                            <Link to="/my-challenges" className="nav-text">
                                <Icon type="trophy" /> My Challenges
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="installations">
                            <Link to="/my-installations" className="nav-text">
                                <Icon type="cluster" /> My Installations
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="about">
                            <Link to="/about" className="nav-text">
                                <Icon type="exclamation-circle" /> About
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Drawer>
            </React.Fragment>
        );
    }
}

export default MainMenu;