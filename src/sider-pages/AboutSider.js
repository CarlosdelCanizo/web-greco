import React from 'react';
import { Layout } from 'antd';
import './Sider.css';
import About from '../header/mainMenu/About';
import MenuHeader from './MenuHeader';
import SiderMenu from './SiderMenu'

const { Header, Content, Sider } = Layout;

const AboutSider = (props) => {

  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/about-sider")

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

        <SiderMenu key={"About"} />

      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <MenuHeader />
        </Header>
        <Content style={{ margin: '-16px 0 0 0' }}>
          <div style={{ background: '#eaedf1', minHeight: 360 }}>

            <About />

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AboutSider