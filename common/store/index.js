import { createStore } from 'redux';

const initState = {
  user: {
    name: 'zhangzhengsmiling',
    age: 18,
  }
}

const reducer = (state = initState, action) => {
  return state;
}

const store = createStore(reducer);

export default store;
