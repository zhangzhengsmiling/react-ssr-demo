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
/**
 * server-sider rendering...
 */
 const serverRenderApp = express();

 serverRenderApp.use('/', express.static('public'));
 serverRenderApp.use('/', (req, res) => {
   const location = req.path;
   if(req.url === '/favicon.ico') return;
   console.log(location)
   const matchedRoute = matchRoutes(routes, location);
  console.log(matchedRoute[0].route.component)
  matchedRoute[0].route.component.getInitialData()
    .then(user => {
      const content = renderToString(
        <Router location={location}>
          <Entry data={user} />
        </Router>
       );
       templateReader
         .then(template => template.replace(/#content/, content))
         .then(html => res.send(html))
         .catch(errorHandlerMiddleware(res))
    })

 });

 serverRenderApp.listen(port, () => {
   console.log('server side render app started on ' + port);
 });
