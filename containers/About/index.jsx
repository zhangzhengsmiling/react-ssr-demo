import React from 'react';
import { useHistory } from 'react-router';

const About = () => {

  const history = useHistory();
  return (
    <div>
      this is about
      <button onClick={() => history.push('/home')}>jump!</button>
    </div>
  );
};

About.getData = () => {
  return new Promise((resolve) => {
    resolve();
  });
};

export default About;
