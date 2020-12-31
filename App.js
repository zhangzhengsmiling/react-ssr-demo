import React from 'react';
import Home from './containers/Home';
import './style';

const App = () => {
  return (
    <div className="app">
      <header className="header">this is header</header>
      <main className="main">
        this is main block
      </main>
    </div>
  )
}

export default React.memo(App);
