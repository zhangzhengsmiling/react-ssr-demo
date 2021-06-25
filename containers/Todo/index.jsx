import React from 'react';
import { Row, Card } from 'antd';
import Header from './header';
import List from './list';
import Footer from './footer';
import appStyle from './app';
import withStyles from 'isomorphic-style-loader/withStyles';
import compose from '@/utils/compose';

class App extends React.Component {

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

export default compose(
  withStyles(appStyle)
)(App);
