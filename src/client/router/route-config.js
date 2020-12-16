import React from 'react';
import Index from '../pages/index';
import List from '../pages/list';

function pageNotFound() {
  return <div>404页面</div>;
}

export default [
  {
    path: '/',
    component: Index,
    exact: true,
  },
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
  {
    path: '*',
    component: pageNotFound,
    exact: true,
  },
];
