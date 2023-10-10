import React from 'react';
import ReactDom from 'react-dom';
import Entry from '../common/Entry';
import { BrowserRouter as Router } from 'react-router-dom'
import SSRDataContext from '@/common/context';


ReactDom.render(
  <SSRDataContext.Provider value={(() => {
    const ssrData = global.ssrData
    global.ssrData = undefined;
    return ssrData;
  })()}>
    <Router>
      <Entry />
    </Router>
  </SSRDataContext.Provider>,
  document.getElementById('root')
)
