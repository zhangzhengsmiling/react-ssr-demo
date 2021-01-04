import { ADD_TODO, DELETE_TODO, CHANGE_TODO_STATUS } from './action-types';
// import { ITodo  } from '../types';
// import { AddTodoAction, DeleteTodoAction, ChangeTodoStatusAction } from './actions'

const initTodoList = [];

export const todoReducer = (todos = initTodoList, action) => {
  console.log(todos)
  switch(action.type) {
    case ADD_TODO:
      return [action.todo, ...todos];
    case DELETE_TODO:
      return todos.filter((todo, index) => index !== action.index);
    case CHANGE_TODO_STATUS:
      const nextTodo = [...todos];
      let target = nextTodo.find((todo, index) => index === action.index);
      target.done = !target.done;
      return nextTodo;
    default:
      return todos;
  }
}
