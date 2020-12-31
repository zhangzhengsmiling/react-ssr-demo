import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';

import React from 'react';
import { StaticRouter as Router } from 'react-router';
import App from '../App';

const port = 3000;
const templatePath = './template/index.html';

const serverRenderApp = express();
const clientRenderApp = express();

serverRenderApp.use('/', express.static('public'));
clientRenderApp.use('/', express.static('public'));

const promisify = (fn) => (...args) => {
  return new Promise((resolve, reject) => {
    fn(...args, (err, data) => {
      if(err) {
        return reject(err.message);
      } else {
        return resolve(data);
      }
    })
  })
}

const readFilePromise = promisify(fs.readFile);
// 读取模板文件template
const tempalteReader = readFilePromise(templatePath)
  .then(data => data.toString());


const logger = (req, res, next) => {
  console.log(`request info: get request from ${req.hostname}, request url: ${req.url}`);
  // next();
}

// serverRenderApp.use('/', logger);
// clientRenderApp.use('/', logger);

serverRenderApp.use('/', (req, res) => {
  console.log(req.url)
  const content = renderToString(
    <Router location={req.url}>
      <App />
    </Router>
  );
  tempalteReader
    .then(template => {
      const html = template.replace(/#content/, content);
      res.send(html);
    })
    .catch(err => {
      res.send({
        message: err.message,
      })
    })
})

clientRenderApp.use('/', (req, res) => {
  tempalteReader
    .then(template => res.send(template.replace(/#content/, '')))
    .catch(err => res.send({ message: err.message }));
})

serverRenderApp.listen(port, () => {
  console.log('server side render app started on ' + port);
});

clientRenderApp.listen(port + 1 , () => {
  console.log('client side render app started on ' + (port + 1));
})
