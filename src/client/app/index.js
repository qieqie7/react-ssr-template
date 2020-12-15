import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../router/index';
import routeList from '../router/route-config';

//渲染 index 组件 到页面
ReactDom.hydrate(
  <BrowserRouter>
    <App routeList={routeList} />
  </BrowserRouter>,
  document.getElementById('root'),
);
