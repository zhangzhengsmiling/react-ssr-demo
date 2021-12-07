import Home from "../containers/Home"
import About from "../containers/About"
import List from '../containers/List';
import { matchRoutes } from 'react-router-config';

export const routes = [
  { path: '/home', component: Home, exact: true },
  { path: '/about', component: About, exact: true },
  { path: '/list', component: List, exact: true },
]

// export const match = (path) => {
//   return routes.find(route => route.path === path);
// }