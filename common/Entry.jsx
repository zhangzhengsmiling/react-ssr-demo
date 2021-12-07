import React, { useReducer, useState } from 'react';
import App from '../containers/App';
import TestContext from './context/TestContext';

const Entry = ({ data }) => {

  const [reqData, setReqData] = useState(data);

  return (
    <TestContext.Provider value={{
      data: reqData,
      setData: setReqData,
    }}>
      <App />
    </TestContext.Provider>
  )
}

export default Entry;
