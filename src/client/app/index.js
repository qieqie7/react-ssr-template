import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../router/index';
import routeList, { matchRoute } from '../router/route-config';

//初始数据
let initialData = JSON.parse(document.getElementById('ssrTextInitData').value);

//查找路由
let route = matchRoute(document.location.pathname, routeList);

//设置组件初始化数据 [关键点]
route && (route.initialData = initialData);

//渲染 index 组件 到页面
ReactDom.hydrate(
  <BrowserRouter>
    <App routeList={routeList} />
  </BrowserRouter>,
  document.getElementById('root'),
);
