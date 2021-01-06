import { ADD_TODO, DELETE_TODO, CHANGE_TODO_STATUS } from './action-types';

export const addTodoActionSync = (todo) => {
  return { type: ADD_TODO, todo }
};
export const deleteTodoAction = (index) => ({ type: DELETE_TODO, index });
export const changeTodoStatusAction = (index) => ({ type: CHANGE_TODO_STATUS, index });

export const addTodoAction = addTodoActionSync;
