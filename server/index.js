// const express = require('express');
import express from 'express';
import { renderToString } from 'react-dom/server';
import fs from 'fs';

import React from 'react';
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

const tempalteReader = readFilePromise(templatePath)
  .then(data => data.toString())

serverRenderApp.get('/', (req, res) => {
  const content = renderToString(<App />);
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

clientRenderApp.get('/', (req, res) => {
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
