const express = require('express');

const app = express();

app.get('/todo-list', (req, res) => {
  console.log('get request ' + req.url)
  res.send({
    todos: [
      { id: 1, todo: 'hello', finished: true },
      { id: 2, todo: 'aaa', finished: false },
      { id: 3, todo: 'bbb', finished: true },
      { id: 4, todo: 'ccc', finished: false },
    ]
  })
});

app.listen(3002, () => {
  console.log('api server started on 3002....');
})
