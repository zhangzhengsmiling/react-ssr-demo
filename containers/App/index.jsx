import React from 'react';
import { Switch, Route } from 'react-router'
import { routes } from '@/common/routes';

const App = () => {
  return (
    <div>
      <Switch>
        {
          routes.map(item => (
            <Route key={item.path} {...item} />
          ))
        }
      </Switch>
    </div>
  )
}


export default App;
