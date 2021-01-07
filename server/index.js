import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';
import promisify from '../utils/promisify';

import React from 'react';
import { StaticRouter as Router } from 'react-router';
import App from '../App';
// import routerGen from '../containers/preview/src/router';
import { Provider } from 'react-redux';
import store from '../common/store';

const port = 3000;
const templatePath = './template/index.html';

const readFilePromise = promisify(fs.readFile);
// 读取模板文件template
const tempalteReader = readFilePromise(templatePath)
  .then(data => data.toString())
const errorHandlerMiddleware = (res) => error => res.send({ message: error });

const logger = (data) => {
  console.log(data);
  return data;
}


/**
 * server-sider rendering...
 */
const serverRenderApp = express();
serverRenderApp.use('/', express.static('public'));
serverRenderApp.use('/', (req, res) => {
  const location = req.url;
  if(req.url === '/favicon.ico') return;
  const content = renderToString(
    <Provider store={store}>
      <Router location={location}>
        <App />
      </Router>
    </Provider>
  );

  tempalteReader
    .then(template => template.replace(/#content/, content))
    .then(html => res.send(html))
    .catch(errorHandlerMiddleware(res))
})
serverRenderApp.listen(port, () => {
  console.log('server side render app started on ' + port);
});

/**
 * client-side rendering...
 */
const clientRenderApp = express();
clientRenderApp.use('/', express.static('public'));
clientRenderApp.use('/', (req, res) => {
  tempalteReader
    .then(template => template.replace(/#content/, ''))
    .then(logger)
    .then(html => res.send(html))
    .catch(errorHandlerMiddleware(res));
})
clientRenderApp.listen(port + 1 , () => {
  console.log('client side render app started on ' + (port + 1));
})
