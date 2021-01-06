import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import promisify from '../utils/promisify';
// import http from 'http';
import request from 'request';

import React from 'react';
import { StaticRouter as Router } from 'react-router';
import App from '../App';
import { Provider } from 'react-redux';
import store from '../common/store';

const port = 3000;
const templatePath = './template/index.html';

const serverRenderApp = express();
const clientRenderApp = express();

serverRenderApp.use('/', express.static('public'));
clientRenderApp.use('/', express.static('public'));

const readFilePromise = promisify(fs.readFile);
// 读取模板文件template
const tempalteReader = readFilePromise(templatePath)
  .then(data => data.toString())

const errorHandlerMiddleware = (res) => error => res.send({ message: error });

const options = {
  hostname: '127.0.0.1',
  port: 3002,
  path: '/todo-list',
  method: 'GET'
}

serverRenderApp.use('/api/v1/', (req, res, next) => {
  const url = 'http://127.0.0.1:3002' + req.url.replace('/api/v1/', '');
  console.log(url);
  request.get(url, (err, incomingMessage) => {
    if(err) {
      res.send({
        message: err.message,
      });
    } else {
      res.send(incomingMessage.body);
    }
  })
})

serverRenderApp.use('/', (req, res) => {
  // if(/\/api\/v1/.test(req.url)) {
  //   console.log('here...');
  //   return;
  // }
  const content = renderToString(
    <Provider store={store}>
      <Router location={req.url}>
        <App />
      </Router>
    </Provider>
  );

  tempalteReader
    .then(template => {
      const html = template.replace(/#content/, content);
      res.send(html);
    })
    .catch(errorHandlerMiddleware(res))
})



clientRenderApp.use('/', (req, res) => {
  tempalteReader
    .then(template => res.send(template.replace(/#content/, '')))
    .catch(errorHandlerMiddleware(res));
})

serverRenderApp.listen(port, () => {
  console.log('server side render app started on ' + port);
});

clientRenderApp.listen(port + 1 , () => {
  console.log('client side render app started on ' + (port + 1));
})
