import React from 'react';
import { Layout } from 'antd';

import './Sider.css';
import ChallengeLevelCard from '../pages/myChallenges/ChallengeLevelCard';
import MenuHeader from './MenuHeader';
import SiderMenu from './SiderMenu'

const { Header, Content, Sider } = Layout;

const ChallengeLevelCardSider = (props) => {

  localStorage.setItem("lastPage", localStorage.getItem("actualPage"))
  localStorage.setItem("actualPage", "/my-challenges-sider")

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

        <SiderMenu key={"My challenges"} />

      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} >
          <MenuHeader />
        </Header>
        <Content style={{ margin: '-16px 0 0 0' }}>
          <div style={{ background: '#f0f2f5', minHeight: 360 }}>

            <ChallengeLevelCard />

          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ChallengeLevelCardSider