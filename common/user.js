
let _user = {
  name: 'zhangzhengsmiling',
  age: 18,
}

export default {
  get() {
    return _user;
  },
  set(user) {
    _user = user;
  }
}
