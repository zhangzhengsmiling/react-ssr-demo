import React from 'react';
import Home from './containers/Home';
import About from './containers/About';
import './style';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';

const App = () => {
  return (
    <div className="app">
      <header className="header">
        <div className="button-area">
          <Link to="/home">
            <button>home</button>
          </Link>
          <Link to="/about">
            <button>about</button>
          </Link>
        </div>
      </header>
      <main className="main">
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
      </main>
    </div>
  )
}

export default React.memo(App);
