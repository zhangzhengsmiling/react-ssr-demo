import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../common/store';
import App from '../App';
import StyleContext from 'isomorphic-style-loader/StyleContext';
// import routerGen from '../containers/preview/src/router';
// const createBrowserHistory =require("history").createBrowserHistory;
// const history = createBrowserHistory();

// const Routers = routerGen(Router, { history });
const insertCss = (...styles) => {
  // const removeCss = styles.map(style => style._insertCss())
  // console.log(styles.forEach(style => console.log(style._getCss())))
  // return () => removeCss.forEach(dispose => dispose())
}
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
