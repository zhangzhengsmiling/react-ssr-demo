import React from 'react';
import { connect } from 'react-redux';

const About = (props) => {
  return (
    <div>
      hello, this is about page....
      <p>{props.user.name}</p>
    </div>
  )
}

export default connect(
  state => state,
)(About);
