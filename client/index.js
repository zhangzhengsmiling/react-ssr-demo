import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../common/store';
import App from '../App';

ReactDom.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
  document.getElementById('root')
)
