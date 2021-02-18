import React, { Component } from 'react';
import { Row, Card } from 'antd';

import Header from './header';
import List from './list';
import Footer from './footer';
import appStyle from './app';
import withStyles from 'isomorphic-style-loader/withStyles';
import useStyles from 'isomorphic-style-loader/useStyles';

// console.log(appStyle._getCss());
// console.log(appStyle._getContent())


const App = () => {
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
// class App extends Component {
//   render() {
//     return (
      
//     )
//   }
// }
console.log(withStyles(appStyle)(App));

// export default withStyles(appStyle)(App);
export default withStyles(appStyle)(App);