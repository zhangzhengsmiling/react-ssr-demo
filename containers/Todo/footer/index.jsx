import React, { Component } from 'react';
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/withStyles';
import footerStyle from './footer';
import compose from '@/utils/compose';


class Footer extends Component {
  render() {
    return (
      <div className="footer-container">
        <h3>
          总任务/已完成:{this.props.todoList.length}/{this.props.todoList.filter(todo => todo.done === true).length}
        </h3>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  todoList: state.todoList
})


export default compose(
  withStyles(footerStyle),
  connect(mapStateToProps, {})
)(Footer);
