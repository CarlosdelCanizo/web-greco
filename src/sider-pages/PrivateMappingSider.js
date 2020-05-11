import React from 'react';
import { Layout } from 'antd';
import { Link } from "react-router-dom";
import PrivateMapping from '../pages/mapping/PrivateMapping';
import './Sider.css';
import MenuHeader from './MenuHeader';
import SiderMenu from './SiderMenu'

const { Header, Content, Sider } = Layout;

const PrivateMappingSider = (props) => {

  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/private-mapping-sider")

  return (
    <Layout>
      <Sider
        id="sider-layout"
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => { console.log(broken); }}
        onCollapse={(collapsed, type) => { console.log(collapsed, type); }}
        theme="light"
      >

        <SiderMenu key={"Private map"} />

      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <MenuHeader />
        </Header>
        <Content style={{ margin: '-16px 0 0 0' }}>
          <div style={{ background: '#fff', minHeight: 360 }}>

            <PrivateMapping />

          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Generation Solar ©2020 </Footer> */}
      </Layout>
    </Layout >
  );
};

export default PrivateMappingSider