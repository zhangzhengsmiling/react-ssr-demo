import { createStore, combineReducers } from 'redux';
import { todoReducer } from './reducers';

const initUser = {
  name: 'zhangzhengsmiling',
  age: 18,
};

const userReducer = (state = initUser, action) => {
  return state;
};
const rootReducer = combineReducers({
  todoList: todoReducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;