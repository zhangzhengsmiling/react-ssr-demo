import React, { Component } from 'react';
import { Row, Card } from 'antd';

import Header from './header';
import List from './list';
import Footer from './footer';
import './app';

export default class App extends Component {
  render() {
    return (
      <div className="app-container">
        <div className="inner-box" style={{ width: '80vw' }}>
            <Row>
              <Card style={{ width: '100%' }} title={<Header/>}>
                <List />
              </Card>
            </Row>
            <Row>
              <Footer />
            </Row>
        </div>
      </div>
    )
  }
}
