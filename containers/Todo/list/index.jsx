import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Checkbox, Button, Empty, message } from 'antd';

import compose from '@/utils/compose';
import { deleteTodoAction, changeTodoStatusAction } from '@/common/store/actions';

const List = (props) => {
  const handleChange = (index) =>  {
    props.changeTodoStatusAction(index);
  }

  const handleDelete = async (index) => {
    await props.deleteTodoAction(index);
    message.success("删除成功", 0.5);
  }
  const { todoList } = props;

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
                    <Checkbox checked={todo.done} onChange={() => { handleChange(index) }} />
                  </Col>
                  <Col style={{ display: 'inline' }} span={10}>
                    <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
                      {
                        todo.content
                      }
                    </span>
                  </Col>
                  <Col span={3} style={{marginTop: '10px', display: 'inline-block', float: 'right'}}>
                    <Button type={'danger'} size={'small'} onClick={() => {handleDelete(index)}}>删除</Button>
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

const mapStateToProps = (state) => {
  return {
    todoList: state.todoList
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteTodoAction: (index) => dispatch(deleteTodoAction(index)),
  changeTodoStatusAction: (index) => dispatch(changeTodoStatusAction(index)),  
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(List);
