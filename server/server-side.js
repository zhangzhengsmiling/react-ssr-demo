import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { StaticRouter as Router } from 'react-router';
import App from '../containers/App/App';
import { Provider } from 'react-redux';
import store from '../common/store';
import templateReader from './middlewares/template-reader';
import errorHandlerMiddleware from './middlewares/error-handler';
import config, { CONFIG_SERVER_KEY } from './config';
const port = config[CONFIG_SERVER_KEY].PORT;

/**
 * server-sider rendering...
 */
 const serverRenderApp = express();
 serverRenderApp.use('/', express.static('public'));
 serverRenderApp.use('/', (req, res) => {
   const location = req.url;
   if(req.url === '/favicon.ico') return;
   const css = new Set();
   const insertCss = (...styles) => {
     return styles.forEach(style => {
       return css.add(style._getCss())
     })
   }
 
   const content = renderToString(
     <StyleContext.Provider value={{ insertCss }}>
       <Provider store={store}>
         <Router location={location}>
           <App />
         </Router>
       </Provider>
     </StyleContext.Provider>
   );
 
   templateReader
     .then(template => template.replace(/#content/, content))
     .then(template => template.replace(/\<style\>\<\/style\>/, '<style>'+ [...css].join('') +'</style>'))
     .then(html => res.send(html))
     .catch(errorHandlerMiddleware(res))
 })
 serverRenderApp.listen(port, () => {
   console.log('server side render app started on ' + port);
 });
