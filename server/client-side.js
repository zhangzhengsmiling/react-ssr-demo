import express from 'express';
import templateReader from './middlewares/template-reader';
import errorHandlerMiddleware from './middlewares/error-handler';
import config, { CONFIG_CLIENT_KEY } from './config';
const port = config[CONFIG_CLIENT_KEY].PORT;

/**
 * client-side rendering...
 */
 const clientRenderApp = express();

 clientRenderApp.use('/api/user', (req, res) => {
  res.json({
    name: 'zhangzhengsmiling',
    age: 18,
    hobby: 'coding...',
  })
});

 clientRenderApp.use('/', express.static('public'));
 clientRenderApp.use('/', (req, res) => {
   if(req.url === '/favicon.ico') return;
   templateReader
     .then(template => template.replace(/#content/, ''))
     .then(template => template.replace(/#script/, ''))
     .then(html => res.send(html))
     .catch(errorHandlerMiddleware(res));
 });

 clientRenderApp.listen(port, () => {
   console.log('client side render app started on ' + port);
 });
