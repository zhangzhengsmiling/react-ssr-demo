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
import SSRDataContext from '@/common/context';
import _fetch from 'node-fetch'
/**
 * server-sider rendering...
 */
 const serverRenderApp = express();
 const fetch = (url) => {
  return _fetch(`http://127.0.0.1:3000${url}`)
 }

 serverRenderApp.use('/api/user', (req, res) => {
  res.json({
    name: 'zhangzhengsmiling',
    age: 18,
    hobby: 'coding...',
  })
});

 serverRenderApp.use('/', express.static('public'));

 serverRenderApp.use('/', (req, res) => {
   const location = req.path;
   if(req.url === '/favicon.ico') return;
   const matchedRoute = matchRoutes(routes, location);
   console.log(matchedRoute)

   const matched = routes.find(item => item.path === location)
   if (!matched) return res.end('<p>ERROR</p>')
   const pureRender = (ssrData) => {
    const script = `window.ssrData=${JSON.stringify(ssrData)}`;
    const content = renderToString(
      <SSRDataContext.Provider value={ssrData}>
        <Router location={location}>
          <Entry />
        </Router>
      </SSRDataContext.Provider>
    )
    templateReader
      .then(template => template.replace(/#content/, content))
      .then(template => template.replace(/#script/, script))
      .then(html => res.send(html))
      .catch(errorHandlerMiddleware(res))
    }
    if (matched.component?.getData) {
      matched.component?.getData(fetch).then(pureRender)
    } else {
      pureRender()
    }
 });

 serverRenderApp.listen(port, () => {
   console.log('server side render app started on ' + port);
 });
