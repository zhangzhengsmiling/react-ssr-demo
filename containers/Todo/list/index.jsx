import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Checkbox, Button, Empty, message } from 'antd';

import { deleteTodoAction, changeTodoStatusAction, addTodoAction } from '../../../common/store/actions';

class List extends Component {

  handleChange = (index) =>  {
    this.props.changeTodoStatusAction(index);
  }

  handleDelete = async (index) => {
    await this.props.deleteTodoAction(index);
    message.success("删除成功", 0.5);
  }

  componentDidMount() {
    fetch('/api/v1/todo-list')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        res.todos.forEach(item => {
          console.log(item)
          this.props.addTodoAction({
            content: item.todo,
            done: item.finished,
          });
        })
      })
  }

  render() {
    const { todoList } = this.props;
    return (
      <div>
      {
        todoList.length ? (
          <div>
            {
              todoList.map((todo, index) => (
               <Row key={index}>
                 <label style={{ width: '100%', whiteSpace: 'nowrap' }}>
                    <Col span={1} style={{ display: 'inline', marginRight: 20 }}>
                      <Checkbox checked={todo.done} onChange={() => { this.handleChange(index) }} />
                    </Col>
                    <Col style={{ display: 'inline' }} span={10}>
                      <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                        {
                          todo.content
                        }
                      </span>
                    </Col>
                    <Col span={3} style={{marginTop: '10px', display: 'inline-block', float: 'right'}}>
                      <Button type={'danger'} size={'small'} onClick={() => {this.handleDelete(index)}}>删除</Button>
                    </Col>
                  </label>
               </Row>
              ))
            }
          </div>
        )
        :
        (<Empty/>)
      }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    todoList: state.todoList
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTodoAction: (index) => dispatch(deleteTodoAction(index)),
  changeTodoStatusAction: (index) => dispatch(changeTodoStatusAction(index)),  
  addTodoAction: (todo) => dispatch(addTodoAction(todo))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(List);
