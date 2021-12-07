import React, { useContext, useEffect } from 'react';
import TestContext from '@/common/context/TestContext';

const Home = (props) => {

  const store = useContext(TestContext);

  useEffect(() => {
    Home.getInitialData()
      .then(user => {
        store.setData(user);
      })
  }, [])

  return (
    <div>
      <h1>
        {store.data?.name}'s homepage
      </h1>
      <p>
        age: {store.data?.age}
      </p>
      <p>
        link...
      </p>
      <p>
        <button onClick={() => props.history.push('/list')}>to list</button>
      </p>
      <p>
        <button onClick={() => props.history.push('/about')}>to about</button>
      </p>
    </div>
  )
}

Home.getInitialData = () => {
  if (Home.data) return new Promise(() => Home.data)
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'zhangzhengsmiling',
        age: 18,
      })
    }, 1000);
  }).then(data => {
    Home.data = data;
    return data;
  })
  return promise;
}

export default Home;
