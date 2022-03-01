import React from 'react';
import ReactDom from 'react-dom';
import Entry from '../common/Entry';
import { BrowserRouter as Router } from 'react-router-dom'
import TestContext from '@/common/context/TestContext';


ReactDom.hydrate(
  <TestContext.Provider value={(() => {
    const ssrData = global.ssrData
    global.ssrData = undefined;
    return ssrData;
  })()}>
    <Router>
      <Entry />
    </Router>
  </TestContext.Provider>,
  document.getElementById('root')
)
