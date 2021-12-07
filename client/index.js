import React from 'react';
import ReactDom from 'react-dom';
import Entry from '../common/Entry';
import { BrowserRouter as Router } from 'react-router-dom'

import TestContext from '../common/context/TestContext';


ReactDom.hydrate(
    <Router>
      <Entry />
    </Router>,
  document.getElementById('root')
)
