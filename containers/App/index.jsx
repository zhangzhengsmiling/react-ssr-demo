import React from 'react';
import { Route, Switch } from 'react-router';
import { routes } from '@/common/routes'

const App = () => {
  return (
    <Switch>
      {
        routes.map(item => (
          <Route key={item.path} path={item.path} component={item.component} />
        ))
      }
    </Switch>
  )
}

export default App;
