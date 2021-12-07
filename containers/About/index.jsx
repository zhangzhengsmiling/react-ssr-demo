import React from 'react';

const About = (props) => {
  return (
    <div>
      hello, this is about...
      <p>
        <button onClick={() => props.history.goBack()}>back</button>
      </p>
    </div>
  )
}

export default About;
