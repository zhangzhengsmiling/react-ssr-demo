import React from 'react';
import Home from './containers/Home';
import About from './containers/About';
import './style';
import { Route } from 'react-router';
import { Link, BrowserRouter as Router} from 'react-router-dom';
import { Layout, Tabs } from 'antd';
const { Header, Content, Footer } = Layout;
const { TabPane } = Tabs;

const App = () => {
  return (
    <div className="app">
      <Header className="header">
        <div className="header-container">
          <h1 className="title">
            SERVER-SIDE RENDER DEMO
          </h1>
        </div>
      </Header>
      <Content className="main">
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </Content>
      <Footer className="footer">
        <div className="footer-container">
          <span className="text">备案号：xxxxxx</span>
        </div>
      </Footer>
    </div>
  )
}

export default React.memo(App);
