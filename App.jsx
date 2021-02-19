import React from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import Home from './containers/Home';
import About from './containers/About';
import Todo from './containers/Todo';
import CountDown from './containers/CountDown/src';
import AnimBarChart from './containers/AnimBarChart';
import CarouselTable from './containers/CarouselTable';
import appStyle from './style';
import { Route } from 'react-router';
import compose from './utils/compose';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <h1 className="title">
            SERVER-SIDE RENDER DEMO
          </h1>
        </div>
      </header>
      <main className="main">
        <Route path="/home" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/todo" component={Todo} />
        <Route path="/count-down" component={CountDown} />
        <Route path="/anim-bar" component={() => <AnimBarChart style={{ width: 400, height: 300 }}></AnimBarChart>} />
        <Route path="/carousel-table" component={CarouselTable} />
      </main>
    </div>
  )
}

export default compose(
  withStyles(appStyle),
  React.memo
)(App);
