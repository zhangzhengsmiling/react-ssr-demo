import React, { useState } from 'react';
import './style';

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
      <div className="aaaa"></div>
    </div>
  )
}

export default Home;
