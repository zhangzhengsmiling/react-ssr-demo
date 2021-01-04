import React from 'react';
import Home from './containers/Home';
import About from './containers/About';
import Todo from './containers/Todo';
import './style';
import { Route } from 'react-router';
import { Link, BrowserRouter as Router} from 'react-router-dom';

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
        <Route path="/todo" component={Todo} />
      </main>
    </div>
  )
}

export default React.memo(App);
