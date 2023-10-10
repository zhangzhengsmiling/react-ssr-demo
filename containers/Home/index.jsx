import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import { useSSRState } from '@/common/context';

const Home = () => {
  const [state, setState] = useSSRState(Home.getData)
  const history = useHistory();
  return (
    <div>
      hello, this is entry point...
      <p>
        name: {state?.name}
      </p>
      <p>
        age: {state?.age}
      </p>
      <p>
        hobby: {state?.hobby}
      </p>
      <p>
        <button onClick={() => history.push('/about')}>jump!</button>
      </p>
    </div>
  )
}

Home.getData = (fetch) => {
  return fetch('/api/user').then(res => res.json())
}

export default Home
