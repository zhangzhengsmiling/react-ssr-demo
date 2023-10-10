import Home from "../containers/Home";
import About from "../containers/About";
import Todo from "../containers/Todo";

export const routes = [
  { path: '/', component: Home, exact: true },
  { path: '/home', component: Home, exact: true },
  { path: '/about', component: About, exact: true },
  { path: '/todo', component: Todo, exact: true },
];
