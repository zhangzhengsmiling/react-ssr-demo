import React from 'react';
import ReactDom from 'react-dom';
import Entry from '../common/Entry';
import { BrowserRouter as Router } from 'react-router-dom';
import SSRDataContext from '@/common/context';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { Provider } from 'react-redux';
import store from '@/common/store';
const insertCss = () => {};

ReactDom.render(
  <StyleContext.Provider value={{ insertCss }}>
    <SSRDataContext.Provider value={(() => {
      const ssrData = global.ssrData;
      global.ssrData = undefined;
      return ssrData;
    })()}>
    <Provider store={store}>
      <Router>
        <Entry />
      </Router>
      </Provider>
    </SSRDataContext.Provider>
  </StyleContext.Provider>,
  document.getElementById('root')
);
