import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../common/store';
import App from '../App';
// import routerGen from '../containers/preview/src/router';
// const createBrowserHistory =require("history").createBrowserHistory;
// const history = createBrowserHistory();

// const Routers = routerGen(Router, { history });
ReactDom.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
      {/* <Routers /> */}
    </Provider>,
  document.getElementById('root')
)
