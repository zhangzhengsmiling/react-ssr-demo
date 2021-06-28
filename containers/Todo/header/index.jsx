import React, { Component } from 'react';
import { Row, Col, Input, Button, message } from 'antd';
import { connect } from 'react-redux';
// import 'antd/lib/button/style';
// import 'antd/lib/row/style';
// import 'antd/lib/col/style';
// import 'antd/lib/input/style';
// import 'antd/lib/message/style';

import { addTodoAction } from '../../../common/store/actions';
import compose from '@/utils/compose';

class Header extends Component {
  state = {
    todoText: '',
    isBtnLoading: false
  }

  handleChange = (e) => {
    const { value } = e.currentTarget;
    this.setState({ todoText: value });
  }

  handleAdd = () => {
    const { todoText } = this.state;
    if(todoText.trim() === '') {
      return;
    }
    this.setState({ isBtnLoading: true });
    this.props.addTodoAction({
      content: todoText,
      done: false
    });
    this.setState({ isBtnLoading: false });
    message.success('添加成功！');
    this.setState({ todoText: '' });
  }

  handleKeyDown = (e) => {
    if(e.keyCode === 13) {
      this.handleAdd();
    }
  }

  render() {
    return (
      <Row>
        <Col span={16}>
          <Input
            placeholder="please input todo："
            value={this.state.todoText}
            onChange={(e) => this.handleChange(e)}
            onKeyDown={(e) => this.handleKeyDown(e)}
          />
        </Col>
        <Col span={8}>
          <Button
            disabled={this.state.todoText.trim() === ''}
            loading={this.state.isBtnLoading}
            type={'primary'}
            style={{ marginLeft: '50%', transform: 'translateX(-50%)' }}
            onClick={() => this.handleAdd()}
          >添加</Button>
        </Col>
      </Row>
    )
  }
}

const mapStaateToProps = (state) => ({
  todoList: state.todoList
})

export default compose(
  connect(mapStaateToProps, { addTodoAction })
)(Header)
