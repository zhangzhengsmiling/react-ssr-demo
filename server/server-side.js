import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import templateReader from './middlewares/template-reader';
import errorHandlerMiddleware from './middlewares/error-handler';
import config, { CONFIG_SERVER_KEY } from './config';
const port = config[CONFIG_SERVER_KEY].PORT;
import Entry from '../common/Entry';
import { StaticRouter as Router } from 'react-router';
import { routes } from '@/common/routes'
import { matchRoutes } from 'react-router-config';
import TestContext from '../common/context/TestContext';
/**
 * server-sider rendering...
 */
 const serverRenderApp = express();

 serverRenderApp.use('/', express.static('public'));

 serverRenderApp.use('/api/user', (req, res) => {
   res.json({
     name: 'zhangzhengsmiling',
     age: 18,
     hobby: 'coding...',
   })
 })
 serverRenderApp.use('/', (req, res) => {
   const location = req.path;
   if(req.url === '/favicon.ico') return;
   const matchedRoute = matchRoutes(routes, location);
   console.log(matchedRoute)

   const matched = routes.find(item => item.path === location)
   if (!matched) return res.end('<p>ERROR</p>')
   matched.component.getData()
    .then((data) => {
      const ssrData = data;
      const script = `window.ssrData=${JSON.stringify(ssrData)}`;
      const content = renderToString(
        <TestContext.Provider value={ssrData}>
          <Router location={location}>
            <Entry />
          </Router>
        </TestContext.Provider>
      )
      templateReader
        .then(template => template.replace(/#content/, content))
        .then(template => template.replace(/#script/, script))
        .then(html => res.send(html))
        .catch(errorHandlerMiddleware(res))
      })

 });

 serverRenderApp.listen(port, () => {
   console.log('server side render app started on ' + port);
 });
