import { matchPath } from "react-router";

import Index from '../pages/index';
import List from '../pages/list';

export default [
  {
    path: '/index',
    component: Index,
    exact: true, //是否精确匹配
  },
  {
    path: '/list',
    component: List,
    exact: true,
  },
];

export const matchRoute = (opt, routeList) => {
  let { path } = opt;
  let route;
  for (var item of routeList) {
    if (matchPath(path, item)) {
      route = item;
      break;
    }
  }
  return route;
};
