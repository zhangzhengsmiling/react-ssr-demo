import React, { useEffect, useState, useContext } from 'react';
import TestContext from '../../common/context/TestContext';
import { useHistory } from 'react-router';

const dataKey = 'HOME';

const Home = () => {

  const store = useContext(TestContext)
  const [state, setState] = useState(store?.[dataKey])
  const history = useHistory();

  useEffect(() => {
    !state && Home.getData()
      .then(data => {
        console.log(data)
        setState(data[dataKey])
      })
  }, [])

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

Home.getData = () => {
  return new Promise((resolve) => {
    console.log('------请求了--------')
    setTimeout(() => {
      return resolve({
          [dataKey]: {
          name: 'zhangzhengsmiling',
          age: 18,
          hobby: 'coding...'
        }
      })
    }, 500)
  })
}

export default Home;