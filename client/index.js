import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../common/store';
import App from '../containers/App/App';
import StyleContext from 'isomorphic-style-loader/StyleContext';

const insertCss = () => {}
ReactDom.hydrate(
    <StyleContext.Provider value={{ insertCss }}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </StyleContext.Provider>,
  document.getElementById('root')
)
