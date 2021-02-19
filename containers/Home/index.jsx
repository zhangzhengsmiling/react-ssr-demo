import React, { useState } from 'react';
import withStyles from 'isomorphic-style-loader/withStyles';
import compose from '@/utils/compose';
import homeStyle from './style';

const Home = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="home">
      <span>
        hello, this is home component
      </span>
      <p>
        {count}
      </p>
      <p>
        <button onClick={() => setCount(count => count + 1)}>+</button>
      </p>
    </div>
  )
}

export default compose(
  withStyles(homeStyle)
)(Home);
