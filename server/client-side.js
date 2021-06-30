import express from 'express';
import templateReader from './middlewares/template-reader';
import errorHandlerMiddleware from './middlewares/error-handler';
import config, { CONFIG_CLIENT_KEY } from './config';
const port = config[CONFIG_CLIENT_KEY].PORT;

/**
 * client-side rendering...
 */
 const clientRenderApp = express();

 clientRenderApp.use('/api/v1/list', (req, res) => {
  res.send({
    code: 1,
    msg: '',
    success: true,
    data: [
      { content: 'hello, this is content1' },
      { content: 'hello, this is content2' },
      { content: 'hello, this is content3' },
    ]
  })
});

 clientRenderApp.use('/', express.static('public'));
 clientRenderApp.use('/', (req, res) => {
   if(req.url === '/favicon.ico') return;
   templateReader
     .then(template => template.replace(/#content/, ''))
     .then(html => res.send(html))
     .catch(errorHandlerMiddleware(res));
 });

 clientRenderApp.listen(port, () => {
   console.log('client side render app started on ' + port);
 });

